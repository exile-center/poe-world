// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {task, timeout} from 'ember-concurrency';
import {argument} from '@ember-decorators/argument';
import {type, optional} from '@ember-decorators/argument/type';
import {action} from '@ember-decorators/object';

// Constants
const SEARCH_DEBOUNCE = 500;

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
  hoveredMap = null;

  mapsLoadTask = task(function*() {
    const maps = yield this.mapsFetcher.fetch();
    this.set('maps', maps);
  }).drop();

  mapsSearchTask = task(function*({query, debounce}) {
    yield timeout(debounce);
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
    this.get('mapsSearchTask').perform({
      query,
      debounce: SEARCH_DEBOUNCE
    });
  }

  @action
  mapSearchClear() {
    this.get('mapsSearchTask').perform({
      query: '',
      debounce: 0
    });
  }

  @action
  mapHover(map) {
    this.set('hoveredMap', map);
  }

  @action
  panzoom() {
    this.$('[popover]').popover('hide');
  }

  @action
  panzoomInitialize(panzoomRef) {
    this.atlasReframer.initialize(panzoomRef);
  }
}
