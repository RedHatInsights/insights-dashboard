[![Build Status](https://travis-ci.org/RedHatInsights/insights-dashboard.svg?branch=master)](https://travis-ci.org/RedHatInsights/insights-frontend-starter-app)

# insights-dashboard
Built to match the mockups here https://marvelapp.com/a5c8bcg/screen/66136610

## Getting Started
There is a [comprehensive quick start guide in the Storybook Documentation](https://github.com/RedHatInsights/insights-frontend-storybook/blob/master/src/docs/welcome/quickStart/DOC.md) to setting up an Insights environment complete with:
- Insights Dashboard App
- [Insights Chroming](https://github.com/RedHatInsights/insights-chrome)
- [Insights Proxy](https://github.com/RedHatInsights/insights-proxy)

Note: You will need to set up the Insights environment if you want to develop with the app due to the consumption of the chroming service as well as setting up your global/app navigation through the API.

## Build app
1. ```npm install```

2. ```npm start```
    - starts webpack bundler and serves the files with webpack dev server

### Testing
- Travis is used to test the build for this code.

  - `npm run test` will run linters and tests

## Deploying

### How it works

- any push to the `{REPO}` `master` branch will deploy to a `{REPO}-build` `ci-beta` branch
- any push to the `{REPO}` `ci-stable` branch will deploy to a `{REPO}-build` `ci-stable` branch
- any push to the `{REPO}` `qa-beta` branch will deploy to a `{REPO}-build` `qa-beta` branch
- any push to the `{REPO}` `qa-stable` branch will deploy to a `{REPO}-build` `qa-stable` branch
- any push to the `{REPO}` `prod-beta` branch will deploy to a `{REPO}-build` `prod-beta` branch
- any push to the `{REPO}` `prod-stable` branch will deploy to a `{REPO}-build` `prod-stable` branch
- Pull requests (based on master) will not be pushed to `{REPO}-build` `master` branch
  - If the PR is accepted and merged, master will be rebuilt and will deploy to `{REPO}-build` `ci-beta` branch