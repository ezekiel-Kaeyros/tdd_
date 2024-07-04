//const {BACKEND_URL} = require("./types/backendUrl");
/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const nextConfig = {
  images: {
    domains: [
      'localhost',
      '127.0.0.1',
      'test-backend.tdd-tool.eu',
      'tddbackend.swyvi.com', 
      'http://ec2-18-222-61-178.us-east-2.compute.amazonaws.com:5000',
      'http://13.58.91.109:5000',
      '13.58.91.109:5000'
    ],
  }, 
  // webpack: (config, { isServer }) => {
  //   config.plugins.push(
  //     new webpack.IgnorePlugin({
  //       resourceRegExp: /warning/,
  //     })
  //   );

  //   return config;
  // }
  // webpack: (config, { dev }) => {
  //   if (!dev) {
  //     // Suppress specific warnings in production
  //     config.plugins.push(
  //       new webpack.DefinePlugin({
  //         'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  //       })
  //     );
  //   }

  //   return config;
  // },
};

module.exports = nextConfig;
