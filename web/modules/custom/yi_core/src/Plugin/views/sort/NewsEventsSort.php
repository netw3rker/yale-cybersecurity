<?php

namespace Drupal\yi_core\Plugin\views\sort;

use Drupal\views\Plugin\views\sort\SortPluginBase;

/**
 * Sort news and events content by a calculated time.
 *
 * This defines a sort order that can be used across the event and news content
 * types. Events are sorted by the time difference from now until the start of
 * the event. News posts are sorted by the time difference from their creation
 * until now.
 *
 * Note: This does not filter entities that would produce negative numbers. We
 * assume past events and future news posts are not displayed.
 *
 * Example query:
 * SELECT
 *   IF(
 *     event_join.field_event_date_value IS NOT NULL,
 *     (FLOOR(UNIX_TIMESTAMP(event_join.field_event_date_value)) - UNIX_TIMESTAMP(NOW())),
 *     (UNIX_TIMESTAMP(NOW()) - node_field_data.created)
 *   ) AS news_events_sort
 * ...
 * LEFT JOIN {node__field_event_date} event_join
 *   ON node_field_data.nid = event_join.entity_id
 * ...
 * ORDER BY news_events_sort DESC
 *
 * @ViewsSort("news_events_sort")
 */
class NewsEventsSort extends SortPluginBase {

  /**
   * {@inheritdoc}
   */
  public function query() {
    // Ensure the main table for this handler is in the query.
    $this->ensureMyTable();

    /** @var \Drupal\views\Plugin\views\query\Sql $query */
    $query = $this->query;

    // Joining on 'node_field_data'.
    $base = $this->view->storage->get('base_table');

    // The views join manager allows us to instantiate our @ViewsJoin plugins.
    $joinManager = \Drupal::service('plugin.manager.views.join');

    // Join the base table onto the field_event_date table.
    $event_config = [
      'type' => 'LEFT',
      'table' => 'node__field_event_date',
      'field' => 'entity_id',
      'left_table' => $base,
      'left_field' => 'nid',
      'operator' => '=',
    ];
    $event_join = $joinManager->createInstance('standard', $event_config);
    $event_alias = $query->addRelationship('event_join', $event_join, $base);

    // Use a formula to calculate the sorting. If the entity has a date value
    // then it is an event. For events, the sorting value is calculated as the
    // time from now until the start of the event. Otherwise, the sorting is
    // calculated as the time from now until when the entity was created.
    $formula = "IF(
      {$event_alias}.field_event_date_value IS NOT NULL,
      (FLOOR(UNIX_TIMESTAMP({$event_alias}.field_event_date_value)) - UNIX_TIMESTAMP(NOW())),
      (UNIX_TIMESTAMP(NOW()) - {$base}.created)
    )";

    $this->query->addOrderBy(
      null, $formula,
      $this->options['order'],
      'news_events_sort'
    );
  }

}
