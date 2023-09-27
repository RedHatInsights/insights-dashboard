[![Build Status](https://travis-ci.org/RedHatInsights/insights-dashboard.svg?branch=master)](https://travis-ci.org/RedHatInsights/insights-dashboard) [![codecov](https://codecov.io/gh/RedHatInsights/insights-dashboard/branch/master/graph/badge.svg)](https://codecov.io/gh/RedHatInsights/insights-dashboard)


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

### Automated testing
After creating PR or pushing to environment branch (`master`, `master-stable`, `prod-beta`, `prod-stable`) Travis is used to test this and to deploy to the corresponding environment.

#### Branch Notes
We are currently migrating to a two branch system. As some old jobs may rely on the old prod-branches, prod-branches are currently up for assurance, but are now read-only.
For releasing, only commit hashes on master and master-stable are required, with an update to app-interface.
