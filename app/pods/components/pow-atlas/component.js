// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {task, timeout} from 'ember-concurrency';
import {argument} from '@ember-decorators/argument';
import {type, optional} from '@ember-decorators/argument/type';
import {tagName} from '@ember-decorators/component';
import {action} from '@ember-decorators/object';

// Constants
const SEARCH_DEBOUNCE = 500;

@tagName('')
export default class Atlas extends Component {
  @service('router')
  router;

  @service('maps/searcher')
  mapsSearcher;

  @service('maps/fetcher')
  mapsFetcher;

  @service('atlas/reframer')
  atlasReframer;

  @argument
  @type(optional('object'))
  currentMap = null;

  maps = null;
  searchedMaps = null;
  zoom = 1;
  panTop = 0;
  panLeft = 0;

  mapsLoadTask = task(function*() {
    const maps = yield this.mapsFetcher.fetch();
    this.set('maps', maps);
  }).drop();

  mapsSearchTask = task(function*(query) {
    yield timeout(SEARCH_DEBOUNCE);
    this.set('searchedMaps', this.mapsSearcher.search(this.maps, query));
  }).restartable();

  willInsertElement() {
    this.get('mapsLoadTask').perform();
  }

  @action
  mapSelect(map) {
    this.router.transitionTo('atlas.map', map.id);
  }

  @action
  mapSearch(query) {
    this.get('mapsSearchTask').perform(query);
  }

  panzoom(panzoomParams) {
    this.setProperties(panzoomParams);
  }

  panzoomInitialize(panzoomRef) {
    this.atlasReframer.initialize(panzoomRef);
  }
}
