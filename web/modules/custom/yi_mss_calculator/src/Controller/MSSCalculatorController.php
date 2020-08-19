<?php

namespace Drupal\yi_mss_calculator\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\node\Entity\Node;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\taxonomy\Entity\Term;
use Drupal\Core\Url;

/**
 * Provides route responses for the Example module.
 */
class MSSCalculatorController extends ControllerBase {

  /**
   * Get the parent node of a specification.
   */
  private function getSpecParentNode($pid) {
    // phpcs:ignore
    $q = \Drupal::entityQuery('node')
      ->condition('type', 'standard')
      ->condition('status', 1)
      ->condition('field_standard_specifications', $pid)
      ->range(0, 1)
      ->execute();

    // phpcs:ignore
    return Node::load(current($q));
  }

  /**
   * Get the first parent node on sub-policy.
   */
  private function getParentNid($nid) {
    // phpcs:ignore
    $q = \Drupal::entityQuery('node')
      ->condition('type', 'standard')
      ->condition('status', 1)
      ->condition('field_sub_policy', $nid)
      ->range(0, 1)
      ->execute();

    return current($q);
  }

  /**
   * Return a template expected array of "labels" to display near the content.
   */
  private function getLabels($spec) {
    $out = [];

    // Required.
    if ($spec->field_required->getValue()[0]['value']) {
      $out['required'] = 'Required';
    }

    // Upcoming.
    if ($spec->field_upcoming->getValue()[0]['value']) {
      $out['upcoming'] = 'Upcoming';
    }

    // Obligations.
    foreach ($spec->field_obligation as $item) {
      $name = $item->get('entity')->getTarget()->getValue()->getName();
      $out[strtolower($name)] = $name;
    }

    return $out;
  }

  /**
   * Get an array of renderable strings from filter arguments.
   */
  private function getFilterStrings($args) {
    $out = [];

    // Device type.
    // phpcs:ignore
    $type = Term::load($args->type);
    $out[] = $type->getName();

    // Internet Access.
    $out[] = $args->access ? 'Can Access Internet' : 'Cannot Access Internet';

    // Risk.
    // phpcs:ignore
    $risk = Term::load($args->risk);
    $out[] = $risk->getName();

    // Obligations.
    if ($args->obligations) {
      // phpcs:ignore
      $obs = Term::loadMultiple(explode(',', $args->obligations));
      foreach ($obs as $term) {
        $out[] = $term->getName();
      }
    }

    return $out;
  }

  /**
   * Get tiered array of results based on grouping primary mss node.
   */
  private function getFilterResults($args) {
    $results = [];

    // phpcs:ignore
    $specs = \Drupal::entityQuery('paragraph')
      ->condition('type', 'specification')
      ->condition('field_device_type', $args->type)
      ->condition('field_internet_access', $args->access)
      ->condition('field_risk_level', $args->risk);

    // The only optional one.
    if ($args->obligations) {
      $specs->condition('field_obligation', explode(',', $args->obligations), 'IN');
    }
    $specs = $specs->execute();

    // No results?
    if (empty($specs)) {
      return [];
    }

    // Load all the paragraphs to get their labels.
    $specs = Paragraph::loadMultiple($specs);

    // Move through all specifications, adding their nodes to the results.
    foreach ($specs as $spec) {
      $node = $this->getSpecParentNode($spec->id());
      $policy = $node->field_policy_number->getString();
      $policyParts = explode('.', $policy);

      // Tertiary or secondary?
      if (count($policyParts) == 2) {
        // Secondary: Get primary.
        $primary = $this->getParentNid($node->id());
      }
      else {
        // Tertiary: Get secondary then primary parent.
        $secondary = $this->getParentNid($node->id());
        if ($secondary) {
          $primary = $this->getParentNid($secondary);
        }
      }

      if ($primary) {
        // Setup primary result container.
        if (!isset($results[$primary])) {
          // phpcs:ignore
          $n = Node::load($primary);
          $results[$primary] = [
            'title' => $n->getTitle(),
            'description' => $n->field_standard_description->getString(),
            'uri' => Url::fromRoute('entity.node.canonical', ['node' => $primary], ['absolute' => TRUE])->toString(),
            'policy_links' => [],
            'children' => [],
          ];
        }

        // Add result to primary container.
        $results[$primary]['children'][$policy] = [
          'policy_number' => $policy,
          'title' => $node->getTitle(),
          'uri' => Url::fromRoute('entity.node.canonical', ['node' => $node->id()], ['absolute' => TRUE])->toString(),
          'labels' => $this->getLabels($spec),
        ];
      }
    }

    return $results;
  }

  /**
   * Returns a calculator page depending on filter status.
   *
   * @return array
   *   A simple renderable array.
   */
  public function calculatorPage() {
    $build = [];

    // Filter data.
    // phpcs:ignore
    $filters = (object) \Drupal::request()->query->all();

    // Add Filter form if not filtered.
    if (!isset($filters->type) || !isset($filters->access) || !isset($filters->risk)) {
      // phpcs:ignore
      $build['filters'] = \Drupal::formBuilder()->getForm('Drupal\yi_mss_calculator\Form\MSSCalculatorFilterForm');
      return $build;
    }

    // Get filtered results array.
    $results = $this->getFilterResults($filters);

    $build['#title'] = 'Minimum Security Standards Filter Results';
    $build['overview'] = [
      '#theme' => 'yi_mss_calculator_overview',
      '#filters' => $this->getFilterStrings($filters),
      '#results' => $results,
    ];

    $build['primary'] = [
      '#theme' => 'yi_mss_calculator_primary',
      '#results' => $results,
    ];

    return $build;
  }

  /**
   * Returns the MSS listing page.
   *
   * @return array
   *   A simple renderable array.
   */
  public function listingPage() {
    $standards = [];

    // Get list of primary standards.
    // phpcs:ignore
    $items = \Drupal::entityQuery('node')
      ->condition('type', 'standard')
      ->condition('field_policy_number', '^[1-9]$|^[1-9][1-9]$', 'REGEXP')
      ->execute();

    // phpcs:ignore
    $nodes = Node::loadMultiple($items);
    foreach ($nodes as $node) {
      $primary = [
        'title' => $node->getTitle(),
        'secondaries' => [],
      ];

      // Compile list of secondary items.
      foreach ($node->get('field_sub_policy')->referencedEntities() as $sub) {
        $secondary = [
          'title' => $sub->getTitle(),
          'uri' => Url::fromRoute('entity.node.canonical', ['node' => $sub->id()], ['absolute' => TRUE])->toString(),
          'specifications' => [],
        ];

        // Add specifications for each.
        foreach ($sub->get('field_standard_specifications')->referencedEntities() as $spec) {
          $risk = $spec->field_risk_level->entity->getName();
          $device = $spec->field_device_type->entity->getName();
          $title = "$risk $device";
          $secondary['specifications'][] = [
            'title' => $title,
            'labels' => $this->getLabels($spec),
          ];
        }

        $primary['secondaries'][] = $secondary;
      }

      $standards[] = $primary;
    }

    $build = [
      '#theme' => 'yi_mss_calculator_listing_page',
      '#standards' => $standards,
    ];

    return $build;
  }

}
