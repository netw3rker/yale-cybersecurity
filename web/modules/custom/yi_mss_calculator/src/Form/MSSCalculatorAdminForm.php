<?php

namespace Drupal\yi_mss_calculator\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Link;

/**
 * Implements the MSS Calculator admin config form.
 */
class MSSCalculatorAdminForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'yi_mss_calculator.messages',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'yi_mss_calculator_admin_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('yi_mss_calculator.messages');

    $export_link = Link::createFromRoute(
      'Click to download the MSS CSV export',
      'yi_mss_calculator.export'
    );

    $form['export_link'] = $export_link->toRenderable();

    $form['listing_header'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Listing Page Header Text'),
      '#default_value' => $config->get('listing_header'),
    ];

    $form['filter_header'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Filter Page Header Text'),
      '#default_value' => $config->get('filter_header'),
    ];

    $form['filter'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('MSS Calculator filter selection page'),
    ];

    $form['filter']['message_device'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Device filter selection description'),
      '#default_value' => $config->get('message_device'),
    ];

    $form['filter']['message_access'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Internet Access filter selection description'),
      '#default_value' => $config->get('message_access'),
    ];

    $form['filter']['message_obligations'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Obligations filter selection description'),
      '#default_value' => $config->get('message_obligations'),
    ];

    $form['filter']['message_risk'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Risk Level filter selection description'),
      '#default_value' => $config->get('message_risk'),
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $items = [
      'filter_header',
      'listing_header',
      'message_device',
      'message_access',
      'message_obligations',
      'message_risk',
    ];
    $conf = $this->config('yi_mss_calculator.messages');

    foreach ($items as $key) {
      $conf->set($key, $form_state->getValue($key));
    }

    $conf->save();
  }

}
