<?php
/*
 * The configuration of SimpleSAMLphp
 *
 */

// Pantheon specific config.
if (!ini_get('session.save_handler')) {
  ini_set('session.save_handler', 'file');
}

$ps = json_decode($_SERVER['PRESSFLOW_SETTINGS'], TRUE);

// Get secrets.
$private_path = $_SERVER['DOCUMENT_ROOT'] . '/' . $ps['conf']['file_private_path'];
$secrets_path = $private_path . '/secrets.json';
$secrets = [];
if (file_exists($secrets_path)) {
  $secrets = json_decode(file_get_contents($secrets_path), TRUE);

  // Fill in cert and key if needed.
  $cert_path = $private_path . '/saml_cert/';
  if (isset($secrets['saml-key']) && isset($secrets['saml-cert']) && !file_exists($cert_path)) {
    mkdir($cert_path, 0700);
    file_put_contents($cert_path . '/sp.crt', $secrets['saml-cert']);
    file_put_contents($cert_path . '/sp.key', $secrets['saml-key']);
  }
}

$host = $_SERVER['HTTP_HOST'];
$db = $ps['databases']['default']['default'];

// Saml base config.
$config = [
  'baseurlpath' => 'https://'. $host .':443/simplesaml/', // SAML should always connect via 443
  'certdir' => '../../../../files/private/saml_cert/',
  'loggingdir' => 'log/',
  'datadir' => 'data/',
  'tempdir' => $_ENV['HOME'] . '/tmp/simplesaml',

  'technicalcontact_name' => 'Identity Management Team',
  'technicalcontact_email' => 'Howard.Gilbert@yale.edu',
  'timezone' => null,

  // Security setup.
  'secretsalt' => $secrets['saml-salt'],
  'auth.adminpassword' => $secrets['saml-adminpass'],
  'admin.protectindexpage' => true,
  'admin.protectmetadata' => false,

  'admin.checkforupdates' => true,
  'trusted.url.domains' => [],
  'trusted.url.regex' => false,
  'enable.http_post' => true,
  'assertion.allowed_clock_skew' => 180,

  // TODO: Turn this off when we're done.
  'production' => false,
  'debug' => [
      'saml' => true,
      'backtraces' => true,
      'validatexml' => true,
  ],
  'showerrors' => true,
  'errorreporting' => true,
  'logging.level' => SimpleSAML\Logger::DEBUG, // Set to NOTICE when ready.
  'logging.handler' => 'syslog',

  // LOGGING.
  'logging.facility' => defined('LOG_LOCAL5') ? constant('LOG_LOCAL5') : LOG_USER,
  'logging.processname' => 'simplesamlphp',
  'logging.logfile' => 'simplesamlphp.log',
  'statistics.out' => [], // Log statistics to the normal log.
  'proxy' => null,

  // Protocol config.
  'enable.saml20-idp' => true,
  'enable.shib13-idp' => false,
  'enable.adfs-idp' => false,
  'shib13.signresponse' => true,

  // Session info.
  'session.duration' => 8 * (60 * 60), // 8 hours.
  'session.datastore.timeout' => (4 * 60 * 60), // 4 hours
  'session.state.timeout' => (60 * 60), // 1 hour
  'session.cookie.name' => 'SimpleSAMLSessionID',
  'session.cookie.lifetime' => 0,
  'session.cookie.path' => '/',
  'session.cookie.domain' => null,
  'session.cookie.secure' => true,
  'session.cookie.samesite' => null,

  /*
    * Options to override the default settings for php sessions.
    */
  'session.phpsession.cookiename' => 'SimpleSAML',
  'session.phpsession.savepath' => null,
  'session.phpsession.httponly' => true,
  'session.authtoken.cookiename' => 'SimpleSAMLAuthToken',
  'session.rememberme.enable' => false,
  'session.rememberme.checked' => false,
  'session.rememberme.lifetime' => (14 * 86400),

  // Language config.
  'language' => [
      'priorities' => [
          'no' => ['nb', 'nn', 'en', 'se'],
          'nb' => ['no', 'nn', 'en', 'se'],
          'nn' => ['no', 'nb', 'en', 'se'],
          'se' => ['nb', 'no', 'nn', 'en'],
          'nr' => ['zu', 'en'],
          'nd' => ['zu', 'en'],
      ],
  ],
  'language.available' => [
      'en', 'no', 'nn', 'se', 'da', 'de', 'sv', 'fi', 'es', 'ca', 'fr', 'it', 'nl', 'lb',
      'cs', 'sl', 'lt', 'hr', 'hu', 'pl', 'pt', 'pt-br', 'tr', 'ja', 'zh', 'zh-tw', 'ru',
      'et', 'he', 'id', 'sr', 'lv', 'ro', 'eu', 'el', 'af', 'zu', 'xh',
  ],
  'language.rtl' => ['ar', 'dv', 'fa', 'ur', 'he'],
  'language.default' => 'en',
  'language.parameter.name' => 'language',
  'language.parameter.setcookie' => true,
  'language.cookie.name' => 'language',
  'language.cookie.domain' => null,
  'language.cookie.path' => '/',
  'language.cookie.secure' => false,
  'language.cookie.httponly' => false,
  'language.cookie.lifetime' => (60 * 60 * 24 * 900),
  'language.cookie.samesite' => null,
  'attributes.extradictionary' => null,
  'theme.use' => 'default',
  'template.auto_reload' => false,

  /*
    * SimpleSAMLphp modules can host static resources which are served through PHP.
    * The serving of the resources can be configured through these settings.
    */
  'assets' => [
      /*
        * These settings adjust the caching headers that are sent
        * when serving static resources.
        */
      'caching' => [
          /*
            * Amount of seconds before the resource should be fetched again
            */
          'max_age' => 86400,
          /*
            * Calculate a checksum of every file and send it to the browser
            * This allows the browser to avoid downloading assets again in situations
            * where the Last-Modified header cannot be trusted,
            * for example in cluster setups
            *
            * Defaults false
            */
          'etag' => false,
      ],
  ],

  'idpdisco.enableremember' => true,
  'idpdisco.rememberchecked' => true,
  'idpdisco.validate' => true,
  'idpdisco.extDiscoveryStorage' => null,
  'idpdisco.layout' => 'dropdown',

  'authproc.idp' => [
      /* Enable the authproc filter below to add URN prefixes to all attributes
      10 => array[
          'class' => 'core:AttributeMap', 'addurnprefix'
      ],
      */
      /* Enable the authproc filter below to automatically generated eduPersonTargetedID.
      20 => 'core:TargetedID',
      */

      // Adopts language from attribute to use in UI
      30 => 'core:LanguageAdaptor',

      45 => [
          'class'         => 'core:StatisticsWithAttribute',
          'attributename' => 'realm',
          'type'          => 'saml20-idp-SSO',
      ],

      /* When called without parameters, it will fallback to filter attributes ‹the old way›
        * by checking the 'attributes' parameter in metadata on IdP hosted and SP remote.
        */
      50 => 'core:AttributeLimit',

      /*
        * Search attribute "distinguishedName" for pattern and replaces if found
        */
      /*
      60 => [
          'class' => 'core:AttributeAlter',
          'pattern' => '/OU=studerende/',
          'replacement' => 'Student',
          'subject' => 'distinguishedName',
          '%replace',
      ],
      */

      /*
        * Consent module is enabled (with no permanent storage, using cookies).
        */
      /*
      90 => [
          'class' => 'consent:Consent',
          'store' => 'consent:Cookie',
          'focus' => 'yes',
          'checked' => true
      ],
      */
      // If language is set in Consent module it will be added as an attribute.
      99 => 'core:LanguageAdaptor',
  ],

  /*
    * Authentication processing filters that will be executed for all SPs
    * Both Shibboleth and SAML 2.0
    */
  'authproc.sp' => [
      /*
      10 => [
          'class' => 'core:AttributeMap', 'removeurnprefix'
      ],
      */

      /*
        * Generate the 'group' attribute populated from other variables, including eduPersonAffiliation.
      60 => [
          'class' => 'core:GenerateGroups', 'eduPersonAffiliation'
      ],
      */
      /*
        * All users will be members of 'users' and 'members'
        */
      /*
      61 => [
          'class' => 'core:AttributeAdd', 'groups' => ['users', 'members']
      ],
      */

      // Adopts language from attribute to use in UI
      90 => 'core:LanguageAdaptor',
  ],

  // Metadata config.
  'metadatadir' => 'metadata',
  'metadata.sources' => [
      ['type' => 'flatfile'],
  ],

  'metadata.sign.enable' => false,
  'metadata.sign.privatekey' => null,
  'metadata.sign.privatekey_pass' => null,
  'metadata.sign.certificate' => null,
  'metadata.sign.algorithm' => null,


  // Data store config.
  'store.type' => 'sql',
  'store.sql.dsn' => 'mysql:host='. $db['host'] .';port='. $db['port'] .';dbname='. $db['database'],
  'store.sql.username' => $db['username'],
  'store.sql.password' => $db['password'],
];
