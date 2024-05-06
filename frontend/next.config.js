//const {BACKEND_URL} = require("./types/backendUrl");
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      '127.0.0.1',
      'test-backend.tdd-tool.eu',
      'http://ec2-18-222-61-178.us-east-2.compute.amazonaws.com:5000',
      'http://13.58.91.109:5000',
      '13.58.91.109:5000'
    ],
  },
};

module.exports = nextConfig;
