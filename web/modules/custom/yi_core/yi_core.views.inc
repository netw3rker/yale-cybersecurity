<?php

/**
 * @file
 * Contains custom views support and definitions.
 */

/**
 * Implements hook_views_data_alter().
 */
function yi_core_views_data_alter(array &$data) {

  // Custom news-events page sort. To satisfy business logic, a custom sort is
  // defined for displaying commingled news and events content. The sort orders
  // news by days-since published and events by days-until the event start.
  $data['node_field_data']['news_events_sort'] = [
    'title' => t('News/Events Date Sort'),
    'field' => [
      'help' => t('Unified sort of news (days-since) and events (days-until).'),
      'id' => 'news_events_sort',
    ],
  ];

}
