import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
  localClassNames: 'map-page',

  router: service('router'),
  atlasReframer: service('atlas/reframer'),

  map: null,

  back() {
    this.atlasReframer.resetMapZoom();
    this.router.transitionTo('atlas');
  }
});
