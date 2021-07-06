<?php

/**
 * SAML 2.0 remote IdP metadata for SimpleSAMLphp.
 */
$name = 'Yale University';
$metadata['https://auth.yale.edu/idp/shibboleth'] = [
  'entityid' => 'https://auth.yale.edu/idp/shibboleth',
  'description' => ['en' => $name],
  'OrganizationName' => ['en' => $name],
  'name' => ['en' => $name],
  'OrganizationDisplayName' => ['en' => $name],
  'url' => [
    'en' => 'https://www.yale.edu/',
  ],
  'OrganizationURL' => [
    'en' => 'https://www.yale.edu/',
  ],
  'contacts' => [
    0 => [
      'contactType' => 'technical',
      'givenName' => 'Howard Gilbert',
      'emailAddress' => [
        0 => 'Howard.Gilbert@yale.edu',
      ],
    ],
    1 => [
      'contactType' => 'support',
      'givenName' => 'Howard Gilbert',
      'emailAddress' => [
        0 => 'Howard.Gilbert@yale.edu',
      ],
    ],
    2 => [
      'contactType' => 'administrative',
      'givenName' => 'Howard Gilbert',
      'emailAddress' => [
        0 => 'Howard.Gilbert@yale.edu',
      ],
    ],
  ],
  'metadata-set' => 'saml20-idp-remote',
  'SingleSignOnService' => [
    0 => [
      'Binding' => 'urn:mace:shibboleth:1.0:profiles:AuthnRequest',
      'Location' => 'https://auth.yale.edu/idp/profile/Shibboleth/SSO',
    ],
    1 => [
      'Binding' => 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
      'Location' => 'https://auth.yale.edu/idp/profile/SAML2/Redirect/SSO',
    ],
    2 => [
      'Binding' => 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
      'Location' => 'https://auth.yale.edu/idp/profile/SAML2/POST/SSO',
    ],
    3 => [
      'Binding' => 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST-SimpleSign',
      'Location' => 'https://auth.yale.edu/idp/profile/SAML2/POST-SimpleSign/SSO',
    ],
  ],
  'SingleLogoutService' => [
    0 => [
      'Binding' => 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
      'Location' => 'https://auth.yale.edu/idp/profile/SAML2/POST/SLO',
    ],
    1 => [
      'Binding' => 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
      'Location' => 'https://auth.yale.edu/idp/profile/SAML2/Redirect/SLO',
    ],
  ],
  'ArtifactResolutionService' => [],
  'NameIDFormats' => [],
  'keys' => [
    0 => [
      'encryption' => FALSE,
      'signing' => TRUE,
      'type' => 'X509Certificate',
      'X509Certificate' => 'MIIDIDCCAgigAwIBAgIVANUBkCs/+UH9FvRGL/Vp/l9kdXzEMA0GCSqGSIb3DQEB BQUAMBgxFjAUBgNVBAMTDWF1dGgueWFsZS5lZHUwHhcNMDkwOTEwMTc0NzEwWhcN MjkwOTEwMTc0NzEwWjAYMRYwFAYDVQQDEw1hdXRoLnlhbGUuZWR1MIIBIjANBgkq hkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmfbA8fNVeW6RJm2n9Jdos9o4eINYdMqj qLU0fWBs9+CHwIVb3WIyp7jhWyr+ILC6mMGvb/9TNm3vlqGPSwR3yKe5KBPlTW81 dSUuqW6emxX1KIhQOy3ynGETcDiDzTosOYgBMynzoqkZSVDgvKn8GUnuj9V1sSwJ 8tuiQLRu42Md+3pN0ED6bX/5wkpal5ZV5uZ2XUb0oS395BS39rAsNw7FyL72s1bT wMml1U1lrHOTVL1zEeuSjKjT8kBFp01Rkq7EdGtUIMswb6flZW4Ss5Kg3ufRxcnt 2j7/OoGA6ZpD2w74R9Jk4phPoAM0nJ5mX/zKz8rU06FjHZAOHbLqEwIDAQABo2Ew XzA+BgNVHREENzA1gg1hdXRoLnlhbGUuZWR1hiRodHRwczovL2F1dGgueWFsZS5l ZHUvaWRwL3NoaWJib2xldGgwHQYDVR0OBBYEFL/j9kq62w7o4+hY1Vnfvv2f8kL4 MA0GCSqGSIb3DQEBBQUAA4IBAQASP6sIJlKHtn+bPJ/TaO2ch/pNNzeBr7ufcJzg tcF0hHbSegu5KlghOsdUVSke3pIThyp7Fs1kUTR7JwGJkQuplo5nbsYOXd6KhoDZ 47omRMk0Ktm2UKvAVx1TEsQKRimFCoZvyM09M08rJBQfFqIXhdAmc4nTSnuuP4Bb sLIiw/Px7ck5SKU34P42sC84ZOHEipMaIvOius1kwNfXkT1WruObk76Cqhnb64QR GdIAn0a0g8Z+gKxllm7FIkCT7auN9E83TfvxjTXLfy6nxSAL/CtiPR4d29PvlDHn ha4CMf2Z60YzbQ1cB5zpjHwlAyDURJtmQG3y2rHqF7/sm/aC',
    ],
  ],
  'scope' => [
    0 => 'nyu.edu',
  ],
  'UIInfo' => [
    'DisplayName' => ['en' => $name],
    'Description' => [],
    'InformationURL' => [],
    'PrivacyStatementURL' => [],
    'Logo' => [
      0 => [
        'url' => 'https://www.yale.edu/sites/all/themes/yale_blue/images/logo-print.png',
        'width' => 169,
        'height' => 76,
        'lang' => 'en',
      ],
    ],
  ],
];