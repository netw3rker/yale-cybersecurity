<?php

namespace Drupal\yi_mss_calculator\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\node\Entity\Node;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\taxonomy\Entity\Term;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\Response;

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
  public static function getParentNid($nid) {
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
  public static function getLabels($spec) {
    $out = [];

    // Required.
    if ($spec->field_required->getValue()[0]['value']) {
      $out['required'] = [
        'title' => 'Required',
        'description' => 'Standard required for specified devices at this risk classification.',
      ];
    }

    // Upcoming.
    if ($spec->field_upcoming->getValue()[0]['value']) {
      $out['upcoming'] = [
        'title' => 'Upcoming',
        'description' => 'Standard will eventually be required for devices at this risk classification.',
      ];
    }

    // Internet Accessible.
    if ($spec->field_internet_access->getValue()[0]['value']) {
      $out['access'] = [
        'title' => 'Required for IA',
        'description' => 'Standard is required if the device can be accessed through the internet.',
      ];
    }

    // Obligations.
    foreach ($spec->field_obligation as $item) {
      $name = $item->get('entity')->getTarget()->getValue()->getName();
      $out[strtolower($name)] = [
        'title' => "Required for $name",
        'description' => "Standard required if the device contains sensitive high risk $name data.",
      ];
    }

    // Only add "Not Required" if we have no other requirements.
    if (empty($out)) {
      $out['not-required'] = [
        'title' => 'Not Required',
        'description' => 'Standard not required for specified devices at this risk classification.',
      ];
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
    $out[] = $args->access ? 'Internet Accessible' : 'Not Internet Accessible';

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
  private function getFilterResults($args, $attach_specs = FALSE) {
    $results = [];

    // phpcs:ignore
    $specs = \Drupal::entityQuery('paragraph')
      ->condition('type', 'specification')
      ->condition('field_device_type', $args->type)
      ->condition('field_risk_level', $args->risk);

    // Required, OR upcoming.
    // phpcs:ignore
    $include = \Drupal::entityQuery('paragraph')->orConditionGroup()
      ->condition('field_required', 1)
      ->condition('field_upcoming', 1);

    // If IA required, include via OR.
    if ($args->access) {
      $include->condition('field_internet_access', 1);
    }

    // Add obligation filters to OR selection.
    if (!empty($args->obligations)) {
      $include->condition('field_obligation', explode(',', $args->obligations), 'IN');
    }

    // Add include OR selection to spec query and execute.
    $specs->condition($include);
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
      $secondary = NULL;

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
            'nid' => $node->id(),
            'description' => $n->field_standard_description->getValue()[0]['value'],
            'uri' => Url::fromRoute('entity.node.canonical', ['node' => $primary], ['absolute' => TRUE])->toString(),
            'policy_links' => [],
            'children' => [],
          ];
        }

        // Add result to primary container.
        $results[$primary]['children'][$policy] = [
          'policy_number' => $policy,
          'title' => $node->getTitle(),
          'nid' => $node->id(),
          'tertiary' => $secondary ? 'mss-sub-policies-tertiary' : '',
          'description' => $node->field_standard_description->getValue()[0]['value'],
          'uri' => Url::fromRoute('entity.node.canonical', ['node' => $node->id()], ['absolute' => TRUE])->toString(),
          'labels' => $this->getLabels($spec),
        ];

        if ($attach_specs) {
          $results[$primary]['children'][$policy]['specifications'] = MSSCalculatorController::getSpecificationsGrid($node);
          $results[$primary]['children'][$policy]['details'] = $node->field_specification_details->view('full');
        }
      }
    }
    return $results;
  }

  /**
   * Get a formatted flat array of specifications for a single standard node.
   */
  public static function getSpecificationsGrid($node, $hide_title = FALSE) {
    $uri = Url::fromRoute('entity.node.canonical', ['node' => $node->id()], ['absolute' => TRUE])->toString();
    $element = [
      '#theme' => 'yi_mss_calculator_specifications_grid',
      '#title' => $node->getTitle(),
      '#uri' => $hide_title ? '' : $uri,
      '#specifications' => [],
      '#attached' => ['library' => ['yi_mss_calculator/mss-library']],
    ];

    foreach ($node->get('field_standard_specifications')->referencedEntities() as $spec) {
      $risk = $spec->field_risk_level->entity->getName();
      $device = $spec->field_device_type->entity->getName();
      $title = "$risk $device";
      $element['#specifications'][] = [
        'title' => $title,
        'labels' => MSSCalculatorController::getLabels($spec),
      ];
    }

    return $element;
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

    $build['#title'] = 'Minimum Security Standards Calculator Results';
    $build['overview'] = [
      '#theme' => 'yi_mss_calculator_overview',
      '#filters' => $this->getFilterStrings($filters),
      '#results' => $results,
      '#attached' => ['library' => ['yi_mss_calculator/mss-library']],
    ];

    $build['download'] = [
      '#type' => 'link',
      '#url' => Url::fromRoute('yi_mss_calculator.download', [], ['query' => (array) $filters]),
      '#title' => $this->t('View Full Report'),
      '#prefix' => '<div class="mss-view-report">',
      '#suffix' => '</div>',
    ];

    $build['download_csv'] = [
      '#type' => 'link',
      '#url' => Url::fromRoute('yi_mss_calculator.csv', [], ['query' => (array) $filters]),
      '#title' => $this->t('Download CSV'),
      '#prefix' => '<div class="mss-view-report">',
      '#suffix' => '</div>',
    ];

    $build['primary'] = [
      '#theme' => 'yi_mss_calculator_primary',
      '#results' => $results,
    ];

    return $build;
  }

  /**
   * Returns a calculator filter results download page.
   *
   * @return array
   *   A simple renderable array.
   */
  public function resultsDownloadPage() {
    $build = [];

    // Filter data.
    // phpcs:ignore
    $filters = (object) \Drupal::request()->query->all();

    // Get filtered results array.
    $results = $this->getFilterResults($filters, TRUE);

    $build['results'] = [
      '#theme' => 'yi_mss_calculator_results_download',
      '#filters' => $this->getFilterStrings($filters),
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
      ->condition('status', 1)
      ->condition('field_policy_number', '%.%', 'NOT LIKE')
      ->execute();

    // phpcs:ignore
    $nodes = Node::loadMultiple($items);
    foreach ($nodes as $node) {

      $primary = [
        'title' => $node->getTitle(),
        'description' => $node->get('field_standard_description')->isEmpty() ? '' : $node->get('field_standard_description')->getValue()[0]['value'],
        'secondaries' => [],
      ];

      // Compile list of secondary items.
      foreach ($node->get('field_sub_policy')->referencedEntities() as $sub) {
        $primary['secondaries'][] = MSSCalculatorController::getSpecificationsGrid($sub);
      }

      $standards[] = $primary;
    }

    $config = $this->config('yi_mss_calculator.messages');
    $build = [
      '#theme' => 'yi_mss_calculator_listing_page',
      '#standards' => $standards,
      '#header_text' => $config->get('listing_header'),
      '#attached' => ['library' => ['yi_mss_calculator/mss-library']],
    ];

    return $build;
  }

  /**
   * Get (or create) term based on name and vocab.
   */
  private function getTerm($name, $vid) {
    // phpcs:ignore
    $term = \Drupal::entityTypeManager()
      ->getStorage('taxonomy_term')
      ->loadByProperties(['name' => $name, 'vid' => $vid]);

    if (empty($term)) {
      $new_term = Term::create(['vid' => $vid, 'name' => $name]);
      $new_term->save();
      return $new_term;
    }
    else {
      return current($term);
    }
  }

  /**
   * Export Data view.
   */
  public function dataExport() {
    // Field => CSV header title.
    $headers = [
      'title' => 'Title',
      'field_policy_number' => 'Policy Number',
      'field_standard_description' => 'Description',
    ];
    $rows = [];

    // Compile all specifications in a standard way.
    $terms = [
      'low' => $this->getTerm('Low Risk', 'risk_level'),
      'mod' => $this->getTerm('Moderate Risk', 'risk_level'),
      'high' => $this->getTerm('High Risk', 'risk_level'),
      'endpoint' => $this->getTerm('Endpoint', 'device_type'),
      'server' => $this->getTerm('Server', 'device_type'),
      'mobile' => $this->getTerm('Mobile Device', 'device_type'),
      'printer' => $this->getTerm('Network Printer', 'device_type'),
      'hipaa' => $this->getTerm('HIPAA', 'obligation'),
      'pci' => $this->getTerm('PCI', 'obligation'),
    ];

    $spec_types = [
      ['low', 'endpoint'],
      ['mod', 'endpoint'],
      ['high', 'endpoint'],

      ['low', 'server'],
      ['mod', 'server'],
      ['high', 'server'],

      ['low', 'mobile'],
      ['mod', 'mobile'],
      ['high', 'mobile'],

      ['low', 'printer'],
      ['mod', 'printer'],
      ['high', 'printer'],
    ];

    $spec_headers = [];
    foreach ($spec_types as $keys) {
      $spec_headers[] = $terms[$keys[0]]->getName() . ' ' . $terms[$keys[1]]->getName();
    }

    // Get all details term data.
    // phpcs:ignore
    $tids = \Drupal::entityQuery('taxonomy_term')
      ->condition('vid', 'specification_detail_type')
      ->execute();

    $detail_headers = [];
    // phpcs:ignore
    $deets = Term::loadMultiple($tids);
    foreach ($deets as $term) {
      $detail_headers[] = $term->getName();
    }

    // Check if we have filtered results for standards.
    // phpcs:ignore
    $filters = (object) \Drupal::request()->query->all();
    $tmp = (array) $filters;

    if (!empty($tmp)) {
      $results = $this->getFilterResults($filters);
      $iterator  = new \RecursiveArrayIterator($results);
      $recursive = new \RecursiveIteratorIterator(
        $iterator,
        \RecursiveIteratorIterator::SELF_FIRST
      );
      foreach ($recursive as $key => $value) {
        if ($key === 'nid') {
          $nids[] = $value;
        }
      }

    }

    // Get all standards.
    if (empty($nids)) {
      // phpcs:ignore
      $nids = \Drupal::entityQuery('node')
        ->condition('type', 'standard')
        ->condition('field_policy_number', '%.%', 'LIKE')
        ->execute();
    }

    // phpcs:ignore
    $nodes = Node::loadMultiple($nids);
    foreach ($nodes as $node) {
      $row = [];
      foreach ($headers as $field => $name) {
        $row[$name] = $node->get($field)->getString();
      }

      // Add device specs, start with empty values.
      foreach ($spec_headers as $key) {
        $row[$key] = 'NA';
      }

      // Add actual spec data to header.
      foreach ($node->get('field_standard_specifications')->referencedEntities() as $spec) {
        $risk = $spec->field_risk_level->entity->getName();
        $device = $spec->field_device_type->entity->getName();
        $type = "$risk $device";

        // If it matches, add the data.
        if (isset($row[$type])) {
          $data = [];

          if ($spec->field_required->getString()) {
            $data[] = 'required';
          }
          if ($spec->field_upcoming->getString()) {
            $data[] = 'upcoming';
          }
          if ($spec->field_internet_access->getString()) {
            $data[] = 'internet';
          }

          foreach ($spec->get('field_obligation')->referencedEntities() as $ob) {
            $data[] = $ob->getName();
          }

          if (count($data)) {
            $row[$type] = implode("|", $data);
          }
        }
      }

      // Attach detail data, start with empty values..
      foreach ($detail_headers as $key) {
        $row[$key] = '';
      }

      foreach ($node->get('field_specification_details')->referencedEntities() as $deet) {
        $type = $deet->field_specification_detail_type->entity->getName();
        if (isset($row[$type])) {
          $row[$type] = $deet->field_specification_detail_data->getString();
        }
      }

      $rows[] = array_values($row);
    }

    // Combine final headers with rows for output.
    $headers = array_merge(array_values($headers), $spec_headers, $detail_headers);
    array_unshift($rows, $headers);

    // Write a CSV to 1mb of memory and then send to response.
    $csv = fopen('php://temp/maxmemory:' . (1 * 1024 * 1024), 'r+');
    foreach ($rows as $row) {
      fputcsv($csv, $row);
    }
    rewind($csv);

    $response = new Response(stream_get_contents($csv));
    $response->headers->set('Content-Type', 'text/csv');

    return $response;
  }

}
