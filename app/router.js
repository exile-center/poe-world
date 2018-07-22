import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const {locationType, rootURL, APP: {DEBUG}} = config;

const Router = EmberRouter.extend({
  location: locationType,
  rootURL
});

/* eslint-disable max-nested-callbacks */
Router.map(function() {
  // Dev routes
  if (DEBUG) {
    this.route('atlas-offsets');
  }

  this.route('atlas', {path: '/'}, function() {
    this.route('map', {path: '/:slug'}, function() {
      this.route('information', {path: '/'});
      this.route('stash');
      this.route('friends');
      this.route('trade');
      this.route('stats');
    });
  });

  this.route('stash', function() {
    this.route('vendor-recipe', {path: '/'});
  });

  this.route('settings', function() {
    this.route('global', {path: '/'});
    this.route('vendor-recipe');
  });
});
/* eslint-enable max-nested-callbacks */

export default Router;
