/* eslint-env node */

'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    hinting: false,
    autoImport: {
      alias: {
        chartjs: 'chart.js/dist/Chart'
      }
    },
    babel: {
      plugins: ['transform-object-rest-spread']
    },
    fontawesome: {
      icons: {
        'free-solid-svg-icons': [
          'times',
          'info',
          'info-circle',
          'coins',
          'compass',
          'skull',
          'balance-scale',
          'spinner',
          'sync',
          'copy',
          'caret-right',
          'minus',
          'plus',
          'square',
          'check-square',
          'download',
          'wrench',
          'bolt',
          'church',
          'file-alt',
          'save',
          'edit',
          'undo',
          'trash',
          'check',
          'link',
          'user-check',
          'user-slash',
          'cog',
          'exclamation-circle',
          'arrow-right',
          'question-circle',
          'bookmark',
          'star',
          'trophy',
          'circle',
          'lock',
          'unlock'
        ],
        'free-brands-svg-icons': ['github', 'discord', 'reddit']
      }
    },

    sassOptions: {
      includePaths: 'node_modules/bootstrap/scss'
    },

    cssModules: {
      intermediateOutputPath: 'app/styles/_pods.scss',
      extension: 'module.scss',
      postcssOptions: {
        syntax: require('postcss-scss')
      }
    }
  });

  app.import('node_modules/panzoom/dist/panzoom.js');
  app.import('node_modules/popper.js/dist/umd/popper.js');
  app.import('node_modules/bootstrap/dist/js/bootstrap.js');

  return app.toTree();
};
