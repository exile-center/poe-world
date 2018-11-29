// Vendor
import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

// Constants
const {modulePrefix, podModulePrefix} = config;

const App = Application.extend({
  modulePrefix,
  podModulePrefix,
  Resolver
});

loadInitializers(App, modulePrefix);

export default App;
