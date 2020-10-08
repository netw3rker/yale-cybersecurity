<?php

/**
 * @file
 * Functions for offering theme suggestions.
 */

/**
 * Implements theme_suggestions_page_alter().
 */
function yale_infosec_theme_suggestions_page_alter(array &$suggestions, array $variables) {
  if ($node = \Drupal::routeMatch()->getParameter('node')) {
    if (gettype($node) === 'object') {
      $content_type = $node->bundle();
      $suggestions[] = 'page__' . $content_type;
    }
  }
}

/**
 * Implements theme_suggestions_paragraph_alter().
 */
function yale_infosec_theme_suggestions_paragraph_alter(array &$suggestions, array $variables) {
  $paragraph = $variables['elements']['#paragraph'];
  $parent = $paragraph->getParentEntity();
  if ($parent) {
    $suggestions[] = 'paragraph__' . $parent->bundle() . '__' . $paragraph->bundle();
  }
}

/**
 * Implements theme_suggestions_time_alter().
 */
function yale_infosec_theme_suggestions_time_alter(array &$suggestions, array $variables) {
  $node = \Drupal::routeMatch()->getParameter('node');
  if (isset($node)) {
    $suggestions[] = 'time__' . $node->bundle();
  }
}

/**
 * Implements theme_suggestions_form_alter().
 */
function yale_infosec_theme_suggestions_form_alter(array &$suggestions, array $variables) {
  $suggestions[] = 'form__' . str_replace('-', '_', $variables['element']['#id']);
}
