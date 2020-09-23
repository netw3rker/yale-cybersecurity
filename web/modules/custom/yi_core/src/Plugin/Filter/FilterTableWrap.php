<?php

namespace Drupal\yi_core\Plugin\Filter;

use Drupal\filter\FilterProcessResult;
use Drupal\filter\Plugin\FilterBase;

/**
 * Filter to wrap tables in other elements for responsive styling.
 *
 * @Filter(
 *   id = "filter_tablewrap",
 *   title = @Translation("Table Wrap Filter"),
 *   description = @Translation("Wrap tables in markup for responsive styling"),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_MARKUP_LANGUAGE,
 * )
 */
class FilterTableWrap extends FilterBase {

  /**
   * Process text and wrap with tags.
   */
  public function process($text, $langcode) {
    // Replace table starting tag with extra markup.
    $replaceTable = '<div class="table-outer-wrapper"><span class="table-overflow"></span><div class="table-wrapper"><table';
    $new_table = str_replace('<table', $replaceTable, $text);

    // Replace table ending tag with extra markup.
    $replaceTableEnd = '</table></div></div>';
    $new_tableEnd = str_replace('</table>', $replaceTableEnd, $text);

    return new FilterProcessResult($new_table, $new_tableEnd);
  }

}
