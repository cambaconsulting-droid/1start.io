const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-native-async-storage/async-storage': path.resolve(__dirname, '__mocks__/react-native-async-storage.js'),
    };
    return config;
  },
};

module.exports = nextConfig;