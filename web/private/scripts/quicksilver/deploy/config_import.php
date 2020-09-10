<?php
  /**
   * Clear all cache
   */
  function clear_cache() {
    echo "Rebuilding cache.\n";
    passthru('drush cr');
    echo "Rebuilding cache complete.\n";
  }
  /**
   * Import config changes.
   */
  function import_config() {
    echo "Importing configuration from yml files...\n";
    passthru('drush cim -y');
    echo "Import of configuration complete.\n";
  }
  /**
   * Import all LIVE config changes.
   */
  function import_live() {
    echo "Importing configuration from yml files...\n";
    passthru('drush csim live -y');
    echo "Import of configuration complete.\n";
  }
  /**
   * Import all DEV config changes.
   */
  function import_dev() {
    echo "Importing configuration from yml files...\n";
    passthru('drush csim dev -y');
    echo "Import of configuration complete.\n";
  }  
  if (defined('PANTHEON_ENVIRONMENT')) {
    switch(PANTHEON_ENVIRONMENT) {
      case 'live':
        // Import config.
        import_config();
        // Cache rebuild.
        clear_cache();
        // Import Live config.
        import_live();
        // Cache rebuild.
        clear_cache();
      case 'test':
        // Import config.
        import_config();
        // Cache rebuild.
        clear_cache();
        // Import Live config.
        import_live();
        // Cache rebuild.
        clear_cache();
      case 'dev':
        // Cache rebuild.
        clear_cache();
        // Import Dev config.
        import_dev();
        // Cache rebuild.
        clear_cache();
        break;
      default:
        // Multidev instances.
        // Cache rebuild.
        clear_cache();
        // Import Dev config.
        import_dev();
        // Cache rebuild.
        clear_cache();
        break;
    }
  }
