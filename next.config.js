const path = require('path');

const nextConfig = {
  target: 'serverless',
  webpack (config) {
    config.resolve.modules.push(path.resolve('./'))
    return config
  },
  images: {
    domains: ['unfolding-word.cdn.prismic.io'],
  },
}

module.exports = nextConfig