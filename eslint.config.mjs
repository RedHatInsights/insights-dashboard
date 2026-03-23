import { defineConfig, globalIgnores } from 'eslint/config';
import fecPlugin from '@redhat-cloud-services/eslint-config-redhat-cloud-services';
import pluginCypress from 'eslint-plugin-cypress';
import reactHooks from 'eslint-plugin-react-hooks';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';

export default defineConfig([
    globalIgnores([
        'coverage/**',
        'dist/**',
        'node_modules/**',
        'src/demoData/**',
    ]),
    fecPlugin,
    pluginCypress.configs.recommended,
    reactHooks.configs.flat['recommended-latest'],
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
