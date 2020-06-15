[![CircleCI](https://circleci.com/gh/yalesites-org/cybersecurity.yale.edu.svg?style=shield)](https://circleci.com/gh/yalesites-org/cybersecurity.yale.edu)
[![Dashboard cybersecurity.yale.edu](https://img.shields.io/badge/dashboard-cybersecurity.yale.edu-yellow.svg)](https://dashboard.pantheon.io/sites/3878688f-3b52-4746-804c-3e2eb786824b#dev/code)
[![Dev Site cybersecurity.yale.edu](https://img.shields.io/badge/site-cybersecurity.yale.edu-blue.svg)](http://dev-cybersecurity.yale.edu.pantheonsite.io/)
# YALE Cybersecurity

Website project for YALE Cybersecurity. Build on Drupal with the Emulsify Design System.

## Contributin Guidlines
- NEED Info

## Local install

```
lando start
```

## Tooling & scripts

This package provides some additional tooling to support the build.

### Helper scripts

To use the helper script provided you will need to have `yarn` or `npm` installed. Then just run `yarn <command>` or `npm run <command>`. For example: `yarn import-data`. These commands are bash scripts located in the `./scripts/sous` directory and defined in `package.json`.

#### Configuration management scripts

**confex**

```
yarn confex
```

Export active configuration to the config directory.

**confim**

```
yarn confim
```

Import the configuration to the database.

**import-data**

```
yarn import-data
```

Import a copy of the canonical database backup into your local instance. This assumes the database backup is located in `./reference/db.sql.gz`.

**local-data-bak**

```
yarn local-data-bak
```

Create a local database backup. Saves the backup to the `./reference` directory.

**rebuild**

```
yarn rebuild
```

Rebuild a fresh local instance of your site. Imports the canonical database backup and imports configuration into it.

ys-001--pr-test