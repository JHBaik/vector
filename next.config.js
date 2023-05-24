/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, context) => {
        config.module.rules.push({
            test: /\/node_modules\/paper\/dist\/node\/.*/i,
            loader: 'ignore-loader'
        });
        return config;
    }
}

module.exports = nextConfig
