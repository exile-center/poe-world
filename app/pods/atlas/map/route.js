import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import {on} from '@ember/object/evented';

export default Route.extend({
  mapsFetcher: service('maps/fetcher'),
  atlasReframer: service('atlas/reframer'),

  model(params) {
    return this.mapsFetcher.fetchMap(params.slug);
  },

  afterModel(map) {
    if (!map) return null;

    this._setAtlasCurrentMap(map);
    this.atlasReframer.reframeFor(map);
  },

  currentMapClear: on('deactivate', function() {
    this._setAtlasCurrentMap(null);
  }),

  _setAtlasCurrentMap(map) {
    this.controllerFor('atlas').set('currentMap', map);
  }
});
