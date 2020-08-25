<?php

/**
 * @file
 * Functions to preprocess.
 */

use Drupal\block\Entity\Block;

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

  // Custom Card Grid Specific.
  if ($parent->bundle() === 'custom_card_grid') {
    if (!empty($parent->get('field_size'))) {
      $vars['card_size'] = $parent->get('field_size')->getString();
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
 * Implements theme_preprocess_node.
 *
 * @param array $vars
 *   Array of variables containing field content.
 */
function yale_infosec_preprocess_node(array &$vars) {
  if ($vars['view_mode'] === 'card') {
    // If News and Events view.
    if (isset($vars['view'])) {
      if ($vars['view']->id() === 'news_events') {
        $vars['threeAcross'] = TRUE;
      }
    }
  }
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
}

/**
 * Implements theme_preprocess_menu.
 *
 * @param array $vars
 *   Array of variables containing menu content.
 */
function yale_infosec_preprocess_menu(array &$vars) {
  if ($vars['menu_name'] === 'main') {
    $block = Block::load('exposedformsearchsearch_page');
    $vars['search_form'] = \Drupal::entityTypeManager()
      ->getViewBuilder('block')
      ->view($block);
  }
}
