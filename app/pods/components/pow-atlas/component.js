// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {task} from 'ember-concurrency';

export default class Atlas extends Component {
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

  mapsLoadTask = task(function*() {
    const maps = yield this.mapsFetcher.fetch();
    this.set('maps', maps);
  }).drop();

  willInsertElement() {
    this.get('mapsLoadTask').perform();
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
