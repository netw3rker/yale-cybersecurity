# Yale SSO

This module contains all scripts, shared configuration, and external modules required by Yale Saml based SSO.

## Installation

1. Add this repository to the list of repos at the top of your `composer.json`
  >
```javascript
"repositories": [
    ...
    {
        "type": "vcs",
        "url": "git@github.com:yalesites-org/yale_sso.git"
    }
],
```
2. Require via composer: `composer require yalesites-org/yale_sso`
3. After install, create and commit a symlink to your repository for the web interface `ln -s ../vendor/simplesamlphp/simplesamlphp/www ./web/simplesaml`
4. Add the post install script to the `post-install-cmd` area of your `composer.json`
  >
```javascript
"scripts": {
    ...
    "post-install-cmd": [
        ...
        "./web/modules/contrib/yale_sso/post_install.sh"
    ],
```

## Config:

For each Pantheon environment you wish to use/work with, use [the Terminus secrets plugin](https://github.com/pantheon-systems/terminus-secrets-plugin) and set the following secrets:

 - `saml-salt`: Salt used for SAML cyptographic hashes. String of at least 32 random chars.
 - `saml-adminpass`: Password used to access the SimpleSaml admin interface.
 - `saml-cert`: Full key contents of the IDP certificate.
 - `saml-key`: Matching certificate private key for the IDP.
