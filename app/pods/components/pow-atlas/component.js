import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency';

export default Component.extend({
  localClassNames: 'atlas',

  router: service('router'),
  mapsFetcher: service('maps/fetcher'),
  atlasReframer: service('atlas/reframer'),

  currentMap: null,

  maps: [],
  zoom: 1,
  panTop: 0,
  panLeft: 0,

  mapsLoadTask: task(function *() {
    const maps = yield this.mapsFetcher.fetch();
    this.set('maps', maps);
  }).drop(),

  willInsertElement() {
    this.mapsLoadTask.perform();
  },

  mapClick(map) {
    this.router.transitionTo('atlas.map', map.id);
  },

  panzoom(panzoomParams) {
    this.setProperties(panzoomParams);
  },

  panzoomInitialize(panzoomRef) {
    this.atlasReframer.initialize(panzoomRef);
  }
});
