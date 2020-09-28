<?php

namespace Drupal\yi_mss_calculator\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\Plugin\Field\FieldFormatter\EntityReferenceFormatterBase;
use Drupal\Core\Field\FieldItemListInterface;

/**
 * Plugin implementation of the 'Standard Details' formatter.
 *
 * @FieldFormatter(
 *   id = "yi_mss_calculator_standard_details",
 *   label = @Translation("Standard Details"),
 *   field_types = {
 *     "entity_reference_revisions"
 *   }
 * )
 */
class StandardDetailsFormatter extends EntityReferenceFormatterBase {

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = [];
    $summary[] = $this->t("Displays the standard's details (excluding hidden detail types).");
    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = [];
    foreach ($this->getEntitiesToView($items, $langcode) as $delta => $entity) {
      if ($entity->id()) {
        $term = current($entity->field_specification_detail_type->referencedEntities());
        // Skip display excluded type terms.
        if ($term->field_hide_display->getString()) {
          continue;
        }

        $elements[$delta] = [
          '#type' => 'item',
          '#title' => $term->getName(),
          '#markup' => $entity->field_specification_detail_data->getValue()[0]['value'],
        ];
      }
    }
    return $elements;
  }

}
