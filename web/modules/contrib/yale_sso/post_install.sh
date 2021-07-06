#!/bin/bash
mkdir -p ./vendor/simplesamlphp/simplesamlphp/config
mkdir -p ./vendor/simplesamlphp/simplesamlphp/metadata
ln -sf ../../../../web/modules/contrib/yale_sso/simplesaml/config.php ./vendor/simplesamlphp/simplesamlphp/config/config.php
ln -sf ../../../../web/modules/contrib/yale_sso/simplesaml/authsources.php ./vendor/simplesamlphp/simplesamlphp/config/authsources.php
ln -sf ../../../../web/modules/contrib/yale_sso/simplesaml/saml20-idp-remote.php ./vendor/simplesamlphp/simplesamlphp/metadata/saml20-idp-remote.php
