<?php

namespace Drupal\evercurrent\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Site\Settings;

/**
 * Administrative settings form.
 *
 * @package Drupal\evercurrent\Form
 */
class AdminForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'evercurrent.admin_config',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'admin_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('evercurrent.admin_config');
    $form['send'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Enable sending update reports'),
      '#description' => $this->t('Check this to enable sending information about available updates to the Ricochet Maintenance server.'),
      '#default_value' => $config->get('send'),
      '#weight' => 1,
    ];
    $form['target_address'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Server URL'),
      '#description' => $this->t('The target environment URL'),
      '#maxlength' => 300,
      '#size' => 40,
      '#default_value' => $config->get('target_address'),
      '#weight' => 2,
    ];
    $form['key'] = [
      '#type' => 'textfield',
      '#title' => $this->t('API Key'),
      '#description' => $this->t('The API key for this site. It should contain only lower case letters and numbers.
If you have development and staging environments,
you should not store the API key in this field, but in your production environment\'s settings.php as follows:
<i>$settings["evercurrent_environment_token"] = "myapikey";</i>
This is important if you are using different environments. See this module\'s documentation for more information.'),
      '#maxlength' => 32,
      '#size' => 32,
      '#default_value' => $config->get('key'),
      '#weight' => 4,
    ];
    $form['details'] = [
      '#type' => 'details',
      '#title' => $this->t('Advanced'),
      '#open' => FALSE,
      '#weight' => 5,
    ];
    $form['details']['listen'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Listen for new API key'),
      '#description' => $this->t('If set, the module will listen for an API key sent from the Maintenance server. Once it has received an API key, it will immediately attempt to send updates to the maintenance server using this API key. If this update succeeds, the API key will be saved. When it is saved, the listening will be automatically stopped.'),
      '#default_value' => $config->get('listen'),
    ];
    $form['details']['interval'] = [
      '#type' => 'select',
      '#title' => t('Report frequency'),
      '#description' => t('The frequency for sending updates to the server. Use this if your cron runs very often.'),
      '#default_value' => $config->get('interval'),
      '#options' => [
        0 => t('Every time Cron runs'),
        3600 => t('Every hour'),
        3600 * 12 => t('Every 12 hours'),
        60 * 60 * 24 => t('Every 24 hours'),
      ],
    ];
    $settings_token = Settings::get('evercurrent_environment_token', NULL);
    if ($settings_token) {
      $form['override'] = [
        '#type' => 'checkbox',
        '#title' => $this->t('Override API key stored in settings.php'),
        '#description' => $this->t(
          "An API key '<b>%key</b>' has been detected in your site's settings.php file.
If you want to override that key, check this box. The API key in the 'API key' field below will then be used instead.",
          ['%key' => $settings_token]
        ),
        '#default_value' => $config->get('override'),
        '#weight' => 3,
      ];
      $form['key']['#states'] = [
        'disabled' => [
          ':input[name="override"]' => ['checked' => FALSE],
        ],
      ];
    }
    $form['send_now'] = [
      '#type' => 'checkbox',
      '#title' => t('Send update report when saving configuration'),
      '#description' => t('Check this to attempt sending updates to the server immediately after you have saved this form.'),
      '#weight' => 10,
    ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $this->config('evercurrent.admin_config')
      ->set('send', $form_state->getValue('send'))
      ->set('listen', $form_state->getValue('listen'))
      ->set('target_address', $form_state->getValue('target_address'))
      ->set('key', $form_state->getValue('key'))
      ->set('interval', $form_state->getValue('interval'))
      ->set('override', $form_state->getValue('override'))
      ->save();

    if ($form_state->getValue('send_now') == TRUE) {
      $this->messenger->addMessage('Attempting to contact server.');
      $updateHelper = \Drupal::service('evercurrent.update_helper');
      $result = $updateHelper->sendUpdates(TRUE, NULL, TRUE);
    }
  }

}
