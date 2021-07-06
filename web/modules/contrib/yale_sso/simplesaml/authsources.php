<?php

$config = [
  'admin' => [
    'core:AdminPassword',
  ],
  'default-sp' => [
    'saml:SP',
    'entityID'             => "urn:pantheonsite.yale.edu/wordpress/shibboleth",
    'idp'                  => "https://auth.yale.edu/idp/shibboleth",
    'NameIDPolicy'         => NULL,
    'redirect.sign'        => TRUE,
    'assertion.encryption' => FALSE,
    'sign.logout'          => TRUE,

    'certificate'          => 'sp.crt',
    'privatekey'           => 'sp.key',
    'signature.algorithm'  => 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256',
  ],
];
