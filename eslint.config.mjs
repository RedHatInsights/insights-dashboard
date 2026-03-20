import { defineConfig, globalIgnores } from 'eslint/config';
import fecPlugin from '@redhat-cloud-services/eslint-config-redhat-cloud-services';
import pluginCypress from 'eslint-plugin-cypress';
import reactHooks from 'eslint-plugin-react-hooks';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';

/** Mirrors compliance-frontend where it applies; dashboard has no TanStack Query / TS / JSDoc stack. */
export default defineConfig([
    globalIgnores([
        'coverage/**',
        'dist/**',
        'node_modules/**',
        'src/demoData/**',
    ]),
    fecPlugin,
    pluginCypress.configs.recommended,
    reactHooks.configs['recommended-latest'],
    testingLibrary.configs['flat/react'],
    jestDom.configs['flat/recommended'],
    {
        languageOptions: {
            globals: {
                React: true,
                insights: true,
            },
        },
        rules: {
            'rulesdir/disallow-fec-relative-imports': 'off',
            'rulesdir/forbid-pf-relative-imports': 'off',
            'testing-library/no-node-access': 'off',
        },
    },
]);
