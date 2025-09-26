const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Esta configuración se aplica solo durante la compilación del lado del servidor
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@react-native-async-storage/async-storage': path.resolve(__dirname, '__mocks__/react-native-async-storage.js'),
      };
    }
    return config;
  },
};

module.exports = nextConfig;