/* eslint-env node */

'use strict';

const npmPackage = require('../package.json');
const fs = require('fs');

// Environment utilities
const parseBooleanString = booleanString => /^true$/i.test(booleanString);

module.exports = function(environment) {
  const changelogPath = `./changelogs/${npmPackage.version.replace(/\./g, '_')}.md`;
  let changelog = null;
  if (fs.existsSync(changelogPath)) changelog = fs.readFileSync(changelogPath, 'utf-8');

  const ENV = {
    modulePrefix: 'poe-world',
    podModulePrefix: 'poe-world/pods',
    environment,
    rootURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    i18n: {
      defaultLocale: 'en'
    },

    viewportConfig: {
      viewportSpy: true
    },

    APP: {
      DEBUG: parseBooleanString(process.env.DEBUG),
      FORCE_CHANGELOG: parseBooleanString(process.env.FORCE_CHANGELOG),
      VERSION: npmPackage.version,
      CHANGELOG: changelog,
      GITHUB_HANDLE: npmPackage.repository.match(/github\.com\/(.+)/)[1]
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
