<?php

namespace Drupal\yi_core\Plugin\views\field;

use Drupal\views\Plugin\views\field\FieldPluginBase;
use Drupal\views\ResultRow;

/**
 * A calculated time used for sorting commingled news and events content.
 *
 * This field is current used only a debugging tool to ensure our sort plugin
 * is working. This defines a sort order that can be used across the event and
 * news content types. Events are sorted by the time difference from now until
 * the start of the event. News posts are sorted by the time difference from
 * their publication until now.
 *
 * Note: This does not filter entities that would produce negative numbers. We
 * assume past events and future news posts are not displayed.
 *
 * @ViewsField("news_events_sort")
 */
class NewsEventsSort extends FieldPluginBase {

  /**
   * {@inheritdoc}
   */
  public function query() {
    // The query method is required as plugins implement ViewsPluginInterface.
    // We are choosing to work in the render method, so leave this empty.
  }

  /**
   * {@inheritdoc}
   */
  public function render(ResultRow $values) {
    // The entity object is available in the render result object.
    $entity = $values->_entity;

    // Name of the date field on events.
    $field = 'field_event_date';

    // For an entity with  event data, the sorting value is calculated as the
    // time from now until the start of the event in seconds.
    if ($entity->hasField($field) && !$entity->get($field)->isEmpty()) {
      $date = $entity->get($field)->start_date->format('Y-m-d H:i:s');
      return strtotime($date) - time();
    }

    // For all other entities, the sorting value is calculated as the time since
    // the entity was created in seconds.
    return time() - $entity->getCreatedTime();
  }
}
