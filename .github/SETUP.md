# Project Setup for Local Development

**Important**
You may need to authorize your machine with Pantheon with your machine token if you are not able to pull assets.

```
lando terminus auth:login --machine-token=TOKEN
```

## Setup steps

1. Clone the project
2. Authorize github packages for theme build.
    - Copy `web/themes/custom/yale_infosec/.npmrc-example` to `web/themes/custom/yale_infosec/.npmrc`
    - Edit `web/themes/custom/yale_infosec/.npmrc` and replace `<your-token>` with a github token that allows the following: REPO(all), read:packages, write:packages
3. run: `npm run build`
4. run: `npm run build-theme`
