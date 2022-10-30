const path = require('path')
const resolveFrom = require('resolve-from')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const fixLinkedDependencies = config => {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    buffer: require.resolve("buffer"),
  });
  config.resolve.fallback = fallback;
  config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
  return config
}

module.exports = [
  fixLinkedDependencies,
]
