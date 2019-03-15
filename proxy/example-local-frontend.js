/*global module, process*/

// Hack so that Mac OSX docker can sub in host.docker.internal instead of localhost
// see https://docs.docker.com/docker-for-mac/networking/#i-want-to-connect-from-a-container-to-a-service-on-the-host
const localhost = (process.env.PLATFORM === 'linux') ? 'localhost' : 'host.docker.internal';

/*
  Until we release the new Cloud proxy...
  $ export SPANDX_CONFIG=$PWD/example-local-frontend.js
  $ export CONTAINER_URL=docker.io/redhatinsights/insights-proxy:cloud
  $ bash ~/prog/insights/proxy/scripts/run.sh # your path differs
*/

module.exports = {
    routes: {
        '/rhcs/dashboard': { host: `http://${localhost}:8002` },
        '/apps/dashboard': { host: `http://${localhost}:8002` }
    }
};
