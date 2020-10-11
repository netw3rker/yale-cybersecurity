<?php

namespace Drupal\yi_core\Plugin\views\field;

use Drupal\views\Plugin\views\field\FieldPluginBase;
use Drupal\views\ResultRow;

/**
 * A calculated time used for sorting commingled news and events content.
 *
 * @ViewsField("news_events_sort")
 */
class NewsEventsSort extends FieldPluginBase {

  public function query() { }

  public function render(ResultRow $values) {
    return 'Value here.';
  }

}
