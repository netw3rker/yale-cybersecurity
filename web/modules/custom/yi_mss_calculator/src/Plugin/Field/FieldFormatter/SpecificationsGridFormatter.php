<?php

namespace Drupal\yi_mss_calculator\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\yi_mss_calculator\Controller\MSSCalculatorController;

/**
 * Plugin implementation of the 'Specifications Grid' formatter.
 *
 * @FieldFormatter(
 *   id = "yi_mss_calculator_specifications_grid",
 *   label = @Translation("Specifications Grid"),
 *   field_types = {
 *     "entity_reference_revisions"
 *   }
 * )
 */
class SpecificationsGridFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $form['hide_title'] = [
      '#title' => $this->t('Hide Title and links'),
      '#type' => 'checkbox',
      '#default_value' => $this->getSetting('hide_title'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'hide_title' => FALSE,
    ] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = [];
    $summary[] = $this->t('Displays the all specifications in the standard grid.');
    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $node = $items->getEntity();
    return MSSCalculatorController::getSpecificationsGrid($node, $this->getSetting('hide_title'));
  }

}
