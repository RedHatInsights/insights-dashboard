[![Build Status](https://img.shields.io/github/actions/workflow/status/RedhatInsights/insights-dashboard/test.yml?branch=master)](https://github.com/RedHatInsights/insights-dashboard/actions/workflows/test.yml) [![codecov](https://codecov.io/gh/RedHatInsights/insights-dashboard/branch/master/graph/badge.svg)](https://codecov.io/gh/RedHatInsights/insights-dashboard)


# insights-dashboard
Built to match the mockups here https://marvelapp.com/a5c8bcg/screen/66136610

## Getting Started
There is a [comprehensive quick start guide in the Storybook Documentation](https://github.com/RedHatInsights/insights-frontend-storybook/blob/master/src/docs/welcome/quickStart/DOC.md) to setting up an Insights environment complete with:
- Insights Dashboard App
- [Insights Chroming](https://github.com/RedHatInsights/insights-chrome)
- [Insights Proxy](https://github.com/RedHatInsights/insights-proxy)

Note: You will need to set up the Insights environment if you want to develop with the app due to the consumption of the chroming service as well as setting up your global/app navigation through the API.

## Developing

### First time setup
1. Make sure you have [`Node.js`](https://nodejs.org/en/) and [`npm`](https://www.npmjs.com/) installed
2. Run [script to patch your `/etc/hosts`](https://github.com/RedHatInsights/insights-proxy/blob/master/scripts/patch-etc-hosts.sh)
3. Make sure you are using [Red Hat proxy](http://hdn.corp.redhat.com/proxy.pac)
4. Clone this repository
5. Run ```npm install``` to install dependencies

### Running locally
1. Run ```npm run start:proxy``` to start chrome proxy and webpack bundler which serves the files with webpack dev server
2. App will be running at ```https://stage.foo.redhat.com:1337/insights/dashboard/```

## Testing

### Testing locally
  - `npm run test` will run all tests
  - `npm run lint` will run linter

## Deploying
The app uses containerized builds which are configured in [`app-interface`](https://gitlab.cee.redhat.com/service/app-interface/-/blob/master/data/services/insights/frontend-base/deploy.yml).

| Environment | Available at                     | Deployed version
| :---------- | :--------------------------------| :----------
| stage       | https://console.stage.redhat.com | master branch
| production  | https://console.redhat.com       | up to the commit configured in `app-interface`
