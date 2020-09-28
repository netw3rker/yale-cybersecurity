<?php

namespace Drupal\yi_mss_calculator\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Implements the MSS Calculator form.
 */
class MSSCalculatorFilterForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'yi_mss_calculator_form';
  }

  /**
   * Get a list of terms by vocab id.
   */
  private function getTerms($vid) {
    // phpcs:ignore
    $terms = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree($vid);
    $term_data = [];
    foreach ($terms as $term) {
      $term_data[$term->tid] = $term->name;
    }

    return $term_data;
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('yi_mss_calculator.messages');

    // Header.
    $form['header'] = [
      '#markup' => $config->get('filter_header'),
    ];

    $form['#prefix'] = '<div class="yi-mss-calculator-form-wrapper">';

    // Device types.
    $form['type'] = [
      '#title' => $this->t('Choose Device Type'),
      '#type' => 'radios',
      '#options' => $this->getTerms('device_type'),
      '#description' => $config->get('message_device'),
    ];

    // Internet Access.
    $form['access'] = [
      '#title' => $this->t('Is the IT system Internet Accessible?'),
      '#type' => 'radios',
      '#options' => [
        0 => $this->t('No, it is not Internet Accessible'),
        1 => $this->t('Yes, it is Internet Accessible'),
      ],
      '#description' => $config->get('message_access'),
    ];

    // External Obligations.
    $form['obligations'] = [
      '#title' => $this->t('External Obligations (Select all that apply)'),
      '#type' => 'checkboxes',
      '#options' => $this->getTerms('obligation'),
      '#description' => $config->get('message_obligations'),
    ];

    // Risk classification.
    $form['risk'] = [
      '#title' => $this->t('Risk Classification'),
      '#type' => 'radios',
      '#options' => $this->getTerms('risk_level'),
      '#description' => $config->get('message_risk'),
    ];

    // Submit.
    $form['actions']['#type'] = 'actions';
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Find Your MSS Requirements'),
      '#button_type' => 'primary',
    ];

    $form['#suffix'] = '</div>';
    $form['#attached'] = ['library' => ['yi_mss_calculator/mss-library']];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    if (!$form_state->getValue('type')) {
      $form_state->setErrorByName('type', $this->t('Please select a device type.'));
    }

    if ($form_state->getValue('access') !== '0' && $form_state->getValue('access') !== '1') {
      $form_state->setErrorByName('access', $this->t('Please select whether the device is accessible via the internet.'));
    }

    // If any obligations are given, risk level MUST be "High Risk".
    if (!empty(array_filter($form_state->getValue('obligations')))) {
      // phpcs:ignore
      $high_risk = current(\Drupal::entityTypeManager()
        ->getStorage('taxonomy_term')
        ->loadByProperties(['name' => 'High Risk', 'vid' => 'risk_level']));
      if ($high_risk->id() != $form_state->getValue('risk')) {
        $form_state->setErrorByName('risk', $this->t('High Risk classification is required if either HIPAA or PCI obligations are selected.'));
      }
    }

    if (!$form_state->getValue('risk')) {
      $form_state->setErrorByName('risk', $this->t('Please select an appropriate risk classification level.'));
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $keys = ['type', 'access', 'obligations', 'risk'];
    $args = [];
    foreach ($keys as $key) {
      $args[$key] = $form_state->getValue($key);
    }

    // Clean up obligations.
    $args['obligations'] = implode(',', array_keys(array_filter($args['obligations'])));

    // Convert filters to query args.
    $url = Url::fromRoute('yi_mss_calculator.calculator');
    $url->setOption('query', $args);

    // Go to response page.
    $response = new RedirectResponse($url->toString());
    $response->send();
  }

}
