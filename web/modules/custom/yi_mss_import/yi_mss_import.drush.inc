<?php

/**
 * @file
 * Drush command for importing content.
 */

use Drupal\node\Entity\Node;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\taxonomy\Entity\Term;

/**
 * Implements hook_drush_command().
 */
function yi_mss_import_drush_command() {
  $commands = [];

  $commands['import-mss'] = [
    'description' => 'Import minimum security standards',
    'aliases' => ['imss'],
  ];

  return $commands;
}

/**
 * Convert an array of google file data into a CSV uri.
 */
function yi_mss_import_get_google_csv_uri($file_ids) {
  $api = "https://docs.google.com/spreadsheets/d/{$file_ids['key']}/export?";
  $args = [
    'id' => $file_ids['key'],
    'gid' => $file_ids['gid'],
    'format' => 'csv',
  ];

  return $api . http_build_query($args);
}

/**
 * Parse CSV from a file and return an array/object hybrid.
 */
function yi_mss_import_csv_data($filename) {
  $data = [];

  $header = NULL;
  if (($handle = fopen($filename, 'r')) !== FALSE) {
    while (($row = fgetcsv($handle, 5000, ',')) !== FALSE) {
      $row = array_map('trim', $row);

      if (!$header) {
        $range_header = range('a', 'z');
        $range_header[] = 'aa';
        $header = (object) array_combine($range_header, $row);
      }
      else {
        if (!empty($row)) {
          $d = array_combine($range_header, $row);
          $data[] = (object) $d;

          // Catch bad rows.
          if (count($range_header) != count($row)) {
            drush_print('Bad row data @ row ' . count($data));
            drush_print('start data========');
            print_r($row);
            drush_print('end data==========');
          }
        }
      }
    }
    fclose($handle);
  }

  return (object) ['data' => $data, 'header' => $header];
}

/**
 * Get (or create) term based on name and vocab.
 */
function yi_mss_import_get_tid($name, $vid) {
  $term = \Drupal::entityTypeManager()
    ->getStorage('taxonomy_term')
    ->loadByProperties(['name' => $name, 'vid' => $vid]);

  if (empty($term)) {
    $new_term = Term::create(['vid' => $vid, 'name' => $name]);
    $new_term->save();
    return $new_term->id();
  }
  else {
    return current($term)->id();
  }
}

/**
 * Create a node based on a data row, header, and list of terms->tids.
 */
function yi_mss_import_get_nid($data, $header, $terms) {
  // Columns denoting their risk, then device.
  $types = [
    'd' => ['low', 'endpoint'],
    'e' => ['mod', 'endpoint'],
    'f' => ['high', 'endpoint'],

    'g' => ['low', 'server'],
    'h' => ['mod', 'server'],
    'i' => ['high', 'server'],

    'j' => ['low', 'mobile'],
    'k' => ['mod', 'mobile'],
    'l' => ['high', 'mobile'],

    'm' => ['low', 'printer'],
    'n' => ['mod', 'printer'],
    'o' => ['high', 'printer'],
  ];

  // Build out all 12 specs for every node.
  $specs = [];
  foreach ($types as $col => $val) {
    $info = array_map('trim', explode("\n", strtolower($data->$col)));

    $obligations = [];
    if (in_array('hipaa', $info)) {
      $obligations[] = ['target_id' => $terms['hipaa']];
    }

    if (in_array('pci', $info)) {
      $obligations[] = ['target_id' => $terms['pci']];
    }

    $specs[] = Paragraph::create([
      'type' => 'specification',
      'field_internet_access' => in_array('ia', $info),
      'field_obligation' => $obligations,
      'field_required' => in_array('x', $info),
      'field_upcoming' => in_array('o', $info),
      'field_risk_level' => ['target_id' => $terms[$val[0]]],
      'field_device_type' => ['target_id' => $terms[$val[1]]],
    ]);
  }

  // Build out any bonus specification details.
  $details = [];
  $bonus_range = range('p', 'z');
  $bonus_range[] = 'aa';
  foreach ($bonus_range as $col) {
    if (trim($data->$col)) {
      $tid = yi_mss_import_get_tid($header->$col, 'specification_detail_type');
      $details[] = Paragraph::create([
        'type' => 'specification_details',
        'field_specification_detail_data' => ['value' => nl2br($data->$col), 'format' => 'basic_html'],
        'field_specification_detail_type' => ['target_id' => $tid],
      ]);
    }
  }

  // Build the final node.
  $title = substr("YALE-MSS-$data->b: $data->c", 0, 255);
  $node = Node::create([
    'status' => 1,
    'type' => 'standard',
    'field_policy_number' => $data->b,
    'title' => $title,
    'field_seo_title' => substr($data->c, 0, 120),
    'field_standard_description' => ['value' => nl2br($data->c), 'format' => 'basic_html'],
    'field_teaser_text' => $data->c,
    'field_standard_specifications' => $specs,
    'field_specification_details' => $details,
  ]);

  $node->set('moderation_state', 'published');
  $node->save();
  return $node->id();
}

/**
 * Drush command for importing mss.
 */
function drush_yi_mss_import_import_mss() {
  $spreadsheet = [
    'key' => '1roY1YmxDZs_eZiTcB9CKo40EmgycYOuqDpLQgNxCrSA',
    'gid' => 91673536,
  ];
  $uri = yi_mss_import_get_google_csv_uri($spreadsheet);

  // Get Data.
  drush_print('Getting spreadsheet data...');
  $data = yi_mss_import_csv_data($uri);

  // Start Import.
  drush_print('Importing ' . count($data->data) . ' google sheet rows as Yale MSS standards...');

  // Make list of top level items.
  $primaries = [];
  foreach ($data->data as $d) {
    $name = trim(str_replace(["\r", "\n", '  '], ['', ' ', ' '], $d->a));
    $policy = current(explode('.', trim($d->b)));
    if ($name && $policy && !isset($primaries[$policy])) {
      $primaries[$policy] = [
        'title' => $name,
        'subs' => [],
      ];
    }
  }

  // Build base terms.
  $terms = [
    'low' => yi_mss_import_get_tid('Low Risk', 'risk_level'),
    'mod' => yi_mss_import_get_tid('Moderate Risk', 'risk_level'),
    'high' => yi_mss_import_get_tid('High Risk', 'risk_level'),
    'endpoint' => yi_mss_import_get_tid('Endpoint', 'device_type'),
    'server' => yi_mss_import_get_tid('Server', 'device_type'),
    'mobile' => yi_mss_import_get_tid('Mobile Device', 'device_type'),
    'printer' => yi_mss_import_get_tid('Network Printer', 'device_type'),
    'hipaa' => yi_mss_import_get_tid('HIPAA', 'obligation'),
    'pci' => yi_mss_import_get_tid('PCI', 'obligation'),
  ];

  // Move through all rows, add valid ones as secondaries.
  $secondaries = [];
  $count = 0;
  foreach ($data->data as $d) {
    // Only accept those with a valid policy number.
    $policy = $d->b;
    if ($policy != '') {
      $pv = explode('.', $policy);

      $count++;

      drush_print('Creating ' . $policy . '...');
      $nid = yi_mss_import_get_nid($d, $data->header, $terms);

      // Populate array bases.
      $primary = $pv[0];
      $secondary = implode('.', [$pv[0], $pv[1]]);

      // Secondary or Tertiary?
      if (isset($pv[2])) {
        // Tertiary.
        $secondaries[$secondary]['subs'][] = ['target_id' => $nid];
      }
      else {
        // Add Secondary to Primary.
        $primaries[$primary]['subs'][] = ['target_id' => $nid];

        // Add Secondary to Tertiary base.
        if (!isset($secondaries[$policy])) {
          $secondaries[$policy] = [
            'base' => $nid,
            'subs' => [],
          ];
        }
        else {
          $secondaries[$policy]['base'] = $nid;
        }
      }
    }
  }

  // Add Top level category nodes and their sub-policies.
  foreach ($primaries as $policy => $d) {
    drush_print('Creating top level policy number ' . $policy . '...');
    $node = Node::create([
      'status' => 1,
      'type' => 'standard',
      'field_policy_number' => $policy,
      'title' => $d['title'],
      'field_standard_description' => [
        'value' => explode(': ', $d['title'])[1],
        'format' => 'basic_html',
      ],
      'field_seo_title' => $d['title'],
      'field_sub_policy' => $d['subs'],
    ]);

    $node->set('moderation_state', 'published');
    $node->save();
  }

  // Edit secondary level nodes and add their sub-policies.
  drush_print('Adding final tertiary level policies...');
  foreach ($secondaries as $policy => $d) {
    if (!empty($d['subs'])) {
      drush_print('Adding tertiary policies to ' . $policy . '...');
      $node = Node::load($d['base']);
      if ($node) {
        $node->set('field_sub_policy', $d['subs']);
        $node->save();
      }
      else {
        drush_print('FAILED to append sub policies to NID ' . $d['base']);
      }
    }
  }

  drush_print('Yale MSS Import Complete!');
}
