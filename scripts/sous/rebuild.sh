#!/bin/bash

composer install
yarn import-local-db
yarn confim
lando drush uli
