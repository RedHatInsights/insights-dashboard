module.exports = {
    presets: [
        [
            '@babel/env',
            {
                targets: '> 0.25%, not dead'
            }
        ],
        '@babel/react',
        '@babel/flow'
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-dynamic-import'
    ],
    env: {
        componentTest: {
            plugins: [
                'istanbul'
            ]
        }
    }
};
