// Vendor
import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const {
  locationType,
  rootURL,
  APP: {DEBUG}
} = config;

class Router extends EmberRouter {
  location = locationType;
  rootURL = rootURL;
}

/* eslint-disable max-nested-callbacks */
Router.map(function() {
  // Dev routes
  if (DEBUG) {
    this.route('atlas-offsets');
  }

  this.route('home', {path: '/'});

  this.route('atlas', function() {
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
    this.route('divination-summary');
  });

  this.route('trade');

  this.route('settings', function() {
    this.route('global', {path: '/'});
    this.route('stash-tabs');
  });
});
/* eslint-enable max-nested-callbacks */

export default Router;
