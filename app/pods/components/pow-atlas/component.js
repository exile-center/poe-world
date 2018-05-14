import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
  router: service('router'),
  mapsFetcher: service('fetchers/maps-fetcher'),
  atlasReframer: service('reframers/atlas-reframer'),

  maps: [],
  hoveredMap: null,
  zoom: 1,
  panTop: 0,
  panLeft: 0,

  willInsertElement() {
    this.set('maps', this.mapsFetcher.fetchSync());
  },

  mapEnter(map) {
    this.set('hoveredMap', map);
  },

  mapLeave() {
    this.set('hoveredMap', null);
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
