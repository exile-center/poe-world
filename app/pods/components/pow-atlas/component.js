// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {dropTask} from 'ember-concurrency-decorators';

export default class Component extends Component {
  localClassNames = 'atlas';

  @service('router')
  router;

  @service('maps/fetcher')
  mapsFetcher;

  @service('atlas/reframer')
  atlasReframer;

  currentMap = null;
  maps = null;
  zoom = 1;
  panTop = 0;
  panLeft = 0;

  @dropTask
  mapsLoadTask = function*() {
    const maps = yield this.mapsFetcher.fetch();
    this.set('maps', maps);
  };

  willInsertElement() {
    this.mapsLoadTask.perform();
  }

  mapClick(map) {
    this.router.transitionTo('atlas.map', map.id);
  }

  panzoom(panzoomParams) {
    this.setProperties(panzoomParams);
  }

  panzoomInitialize(panzoomRef) {
    this.atlasReframer.initialize(panzoomRef);
  }
}
