<?php

/**
 * @file
 * Functions to preprocess.
 */

use Drupal\block\Entity\Block;
use \Drupal\paragraphs\Entity\Paragraph;

/**
 * Implements theme_preprocess_page.
 *
 * @param array $vars
 *   Array of variables containing field content.
 */
function yale_infosec_preprocess_page(array &$vars) {
  $view_id = \Drupal::routeMatch()->getParameter('view_id');
  if ($view_id) {
    $vars['viewPage'] = TRUE;
  }
  // Node information.
  if (isset($vars['node'])) {
    $node = \Drupal::routeMatch()->getParameter('node');
    // Hero header image information.
    if (isset($node->field_header_image) && $node->get('field_header_image')->getValue()) {
      $vars['withHeaderImage'] = TRUE;
    }
  }
}

/**
 * Implements theme_preprocess_paragraph.
 *
 * @param array $vars
 *   Array of variables containing field content.
 */
function yale_infosec_preprocess_paragraph(array &$vars) {
  $paragraph = $vars['paragraph'];
  // Parent information.
  $parent = $paragraph->getParentEntity();
  // Home.
  if ($parent->bundle() === 'frontpage') {
    $vars['title'] = $parent->label();
    // Title.
    if (!empty($parent->get('field_header_title'))) {
      $vars['headerTitle'] = $parent->get('field_header_title')->getString();
    }
    // Subtitle.
    if (!empty($parent->get('field_header_subtitle'))) {
      $vars['subTitle'] = $parent->get('field_header_subtitle')->getString();
    }
  }
  // Guide.
  if ($parent->bundle() === 'guide') {
    $vars['title'] = $parent->label();
  }

  // Custom Card Grid Specific.
  if ($parent->bundle() === 'custom_card_grid') {
    if (!empty($parent->get('field_size'))) {
      $vars['card_size'] = $parent->get('field_size')->getString();
    }
  }

  // Grid related.
  if ($parent->bundle() === 'grid_type') {
    if (!empty($parent->get('field_grid_style'))) {
      $vars['grid_style'] = $parent->get('field_grid_style')->getString();
    }
  }
}

/**
 * Implements theme_preprocess_time.
 *
 * @param array $vars
 *   Array of variables containing field content.
 */
function yale_infosec_preprocess_time(array &$vars) {
  $vars['timeStamp'] = $vars['attributes']['datetime'];
}

/**
 * Implements theme_preprocess_field.
 *
 * @param array $vars
 *   Array of variables containing field content.
 */
function yale_infosec_preprocess_field(array &$vars) {
  if ($vars['field_name'] === 'field_content_block') {
    $vars['home_news'] = views_embed_view('news_events', 'block_1');
  }

  // Exclude "Version," "Current Policy, Practice, Procedure Alignment," and
  // "Current Policy, Practice, Procedure Alignment Details" from displaying on
  // the specification details of Standard node types.
  if ($vars['field_name'] === 'field_specification_details') {

    // - 36 = "Current Policy, Practice, Procedure Alignment,"
    // - 37 = "Current Policy, Practice, Procedure Alignment Details"
    // - 38 = "Version"
    $term_ids = [36, 37, 38];

    // Loops through the multiple values of the field_specification_details.
    foreach($vars['element']['#items']->getValue() as $key => $item) {

      // Load the paragraph to find out the tax term specified in the
      // paragraph__field_specification_detail_type field.
      $paragraph = Paragraph::load($item['target_id']);
      $term_id = $paragraph->field_specification_detail_type->getValue()[0]['target_id'];

      // Remove the paragraph from display if its tax term is one of the
      // three above.
      if (in_array($term_id, $term_ids)) {
        unset($vars['items'][$key]);
      }
    }
  }
}

/**
 * Implements theme_preprocess_menu.
 *
 * @param array $vars
 *   Array of variables containing menu content.
 */
function yale_infosec_preprocess_menu(array &$vars) {
  if ($vars['menu_name'] === 'main') {
    $block = Block::load('exposedformsearchsearch_page_2');
    $vars['search_form'] = \Drupal::entityTypeManager()
      ->getViewBuilder('block')
      ->view($block);
  }
}
