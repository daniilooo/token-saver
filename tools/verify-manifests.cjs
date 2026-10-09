'use strict';

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const readJson = relative => JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
const packageManifest = readJson('package.json');
const pluginManifest = readJson('plugins/token-saver/.claude-plugin/plugin.json');
const marketplace = readJson('.claude-plugin/marketplace.json');

const versionPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
if (!versionPattern.test(packageManifest.version)) throw Error(`Invalid package version: ${packageManifest.version}`);
if (packageManifest.version !== pluginManifest.version) {
  throw Error(`Version mismatch: package.json=${packageManifest.version}, plugin.json=${pluginManifest.version}`);
}
if (!marketplace.plugins.some(plugin => plugin.name === pluginManifest.name && plugin.source === './plugins/token-saver')) {
  throw Error('Marketplace does not point token-saver to ./plugins/token-saver');
}
if (!packageManifest.engines || !packageManifest.engines.node) throw Error('package.json must declare a Node engine');

console.log(`Manifests verified: token-saver ${pluginManifest.version}; Node ${packageManifest.engines.node}`);
