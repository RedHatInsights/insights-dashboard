const { resolve } = require('path');
const packageJson = require('./package.json');
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');
const {
  readFrontendCRD,
} = require('@redhat-cloud-services/frontend-components-config-utilities/feo/crd-check');

// Resolve https-proxy-agent through the fec library's dependency tree (it
// is not a direct dependency of this repo).
const HttpsProxyAgent = require(
  require.resolve('https-proxy-agent', {
    paths: [
      resolve(
        __dirname,
        './node_modules/@redhat-cloud-services/frontend-components-config-utilities',
      ),
    ],
  }),
);

// http-proxy-middleware is also transitive (via webpack-dev-server, whose
// dev server consumes this proxy config) — resolve it the same way.
const { responseInterceptor } = require(
  require.resolve('http-proxy-middleware', {
    paths: [resolve(__dirname, './node_modules/webpack-dev-server')],
  }),
);

// PERMANENT DEV TOOLING (RHINENG-33886) — deliberately kept for future
// widget development; do not remove. The grid's add-widget drawer lists
// widgets from the widget-layout backend's WIDGET_MAPPING env, which the
// platform generates from DEPLOYED frontend.yaml CRDs — so a widget
// registered only in this repo's local CRD is invisible in the local
// grid until its first deploy. This dev-proxy entry injects this repo's
// own widgetRegistry entries into the widget-mapping API response so
// widget authors can add and drag their locally-registered widget in the
// real grid before anything deploys (see docs/local-widget-dev.md).
// Dev-server-only: fec reads customProxy only when running the dev
// server — production builds never see it.
const WIDGET_MAPPING_PATHS = [
  '/api/chrome-service/v1/dashboard-templates/widget-mapping', // old backend (default)
  '/api/widget-layout/v1/widget-mapping', // new backend
];

const clouddotEnv = (process.env.CLOUDOT_ENV || 'stage').split('-')[0];
const envTarget =
  clouddotEnv === 'prod'
    ? 'https://console.redhat.com/'
    : clouddotEnv === 'ephemeral'
      ? `https://${process.env.EPHEMERAL_TARGET || 'console.stage.redhat.com'}/`
      : `https://console.${clouddotEnv}.redhat.com/`;

// Stage (and prod) API egress requires the corporate squid proxy — same
// agent setup the fec dev proxy itself uses.
const needsProxyAgent = ['stage', 'ephemeral', 'prod'].includes(clouddotEnv);

// Inject this repo's widgetRegistry entries into a widget-mapping response
// buffer. Re-reads frontend.yaml on every response, so registry edits only
// need a browser refresh (only fec.config.js changes need a dev-server
// restart). Non-JSON or non-mapping payloads pass through untouched — the
// injection must never break the response.
const injectLocalWidgetRegistry = (buffer) => {
  let json;
  try {
    json = JSON.parse(buffer.toString('utf8'));
  } catch {
    return buffer;
  }
  if (!json || typeof json !== 'object' || !json.data) {
    return buffer;
  }
  let spec = {};
  try {
    const crd = readFrontendCRD(resolve(__dirname, './frontend.yaml'));
    spec = (crd.objects || []).find((o) => o.kind === 'Frontend')?.spec || {};
  } catch (error) {
    console.error(
      'widget-mapping injection: could not read frontend.yaml:',
      error,
    );
    return buffer;
  }
  (spec.widgetRegistry || [])
    // only this app's own modules resolve to the local dev server
    .filter((entry) => entry.scope === 'dashboard')
    .forEach((entry) => {
      json.data[entry.module] = {
        scope: entry.scope,
        module: entry.module,
        config: entry.config,
        defaults: entry.defaults,
        ...(entry.featureFlag ? { featureFlag: entry.featureFlag } : {}),
      };
    });
  return Buffer.from(JSON.stringify(json));
};

module.exports = {
  appUrl: '/insights/dashboard',
  debug: true,
  useProxy: process.env.PROXY === 'true',
  proxyVerbose: true,
  devtool: 'hidden-source-map',
  _unstableSpdy: true,
  plugins: [
    // Put the Sentry Webpack plugin after all other plugins
    ...(process.env.ENABLE_SENTRY
      ? [
          sentryWebpackPlugin({
            ...(process.env.SENTRY_AUTH_TOKEN && {
              authToken: process.env.SENTRY_AUTH_TOKEN,
            }),
            org: 'red-hat-it',
            project: 'dashboard-rhel',
            moduleMetadata: ({ release }) => ({
              dsn: `https://f8eb44de949e487e853185c09340f3cf@o490301.ingest.us.sentry.io/4505397435367424`,
              org: 'red-hat-it',
              project: 'dashboard-rhel',
              release,
            }),
          }),
        ]
      : []),
  ],
  ...(process.env.port ? { port: parseInt(process.env.port) } : {}),
  // PERMANENT DEV TOOLING (RHINENG-33886) — kept for future widget
  // development, see the note at the top of this file. Production builds
  // never read this.
  customProxy: [
    {
      context: (path) => WIDGET_MAPPING_PATHS.some((p) => path.includes(p)),
      target: envTarget,
      secure: false,
      changeOrigin: true,
      ...(needsProxyAgent
        ? { agent: new HttpsProxyAgent('http://squid.corp.redhat.com:3128') }
        : {}),
      headers: {
        'accept-encoding': 'gzip;q=0,deflate,sdch',
        Host: envTarget.replace('https://', ''),
        Origin: envTarget.replace(/\/$/, ''),
      },
      // NOTE: deliberately no onProxyReq/cookieTransform. http-proxy emits
      // 'proxyReq' on the outgoing request's socket event, and with the
      // squid agent node has already flushed the headers by then —
      // cookieTransform's setHeader('x-rh-identity') then crashes the dev
      // server with ERR_HTTP_HEADERS_SENT. It is also unnecessary: the
      // environment edge derives x-rh-identity from the forwarded cs_jwt
      // cookie, exactly like the fec main proxy entry does.
      selfHandleResponse: true,
      onProxyRes: responseInterceptor(async (buffer) =>
        injectLocalWidgetRegistry(buffer),
      ),
    },
  ],
  moduleFederation: {
    shared: [
      {
        'react-router-dom': {
          singleton: true,
          import: false,
          version: packageJson.dependencies['react-router-dom'],
          requiredVersion: '>=6.0.0 <7.0.0',
        },
      },
    ],
    exposes: {
      './AppZeroState': resolve(
        __dirname,
        './src/PresentationalComponents/ZeroState/AppZeroState.js',
      ),
      './ZeroStateBanner': resolve(
        __dirname,
        './src/PresentationalComponents/ZeroState/ZeroStateBanner.js',
      ),
      './AppSection': resolve(
        __dirname,
        './src/PresentationalComponents/ZeroState/AppSection.js',
      ),
      './ZeroStateFooter': resolve(
        __dirname,
        './src/PresentationalComponents/ZeroState/ZeroStateFooter.js',
      ),
      './RootApp': resolve(__dirname, './src/AppEntry.js'),
      './RhelWidget': resolve(
        __dirname,
        './src/PresentationalComponents/Widgets/rhel-widget.tsx',
      ),
      './InventoryWidget': resolve(
        __dirname,
        './src/PresentationalComponents/Widgets/InventoryWidget.tsx',
      ),
    },
  },
  frontendCRDPath: 'frontend.yaml',
};
