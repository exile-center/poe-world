// Vendor
import Route from '@ember/routing/route';
import {service} from '@ember-decorators/service';
import {action} from '@ember-decorators/object';

export default class Map extends Route {
  @service('maps/fetcher')
  mapsFetcher;

  @service('atlas/reframer')
  atlasReframer;

  model(params) {
    return this.mapsFetcher.fetchMap(params.slug);
  }

  afterModel(map) {
    if (!map) return null;

    this._setAtlasCurrentMap(map);
    this.atlasReframer.reframeFor(map);
  }

  @action
  deactivate() {
    this._setAtlasCurrentMap(null);
  }

  _setAtlasCurrentMap(map) {
    this.controllerFor('atlas').set('currentMap', map);
  }
}
