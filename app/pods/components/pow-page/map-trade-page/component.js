// Vendor
import {A} from '@ember/array';
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {task} from 'ember-concurrency';
import {argument} from '@ember-decorators/argument';
import {type} from '@ember-decorators/argument/type';

export default class PageMapTrade extends Component {
  @service('maps/trade-fetcher')
  mapsTradeFetcher;

  @argument
  @type('object')
  map = null;

  tradeMapIds = null;
  tradeMaps = A([]);
  isMapsInitiallyLoaded = false;

  initialLoadTask = task(function*() {
    const {mapsTradeFetcher, map, tradeMaps} = this;
    const {tradeMaps: newTradeMaps, tradeMapIds, total} = yield mapsTradeFetcher.fetchFromMap(map);

    tradeMaps.addObjects(newTradeMaps);

    this.setProperties({
      tradeMapIds,
      total,
      isMapsInitiallyLoaded: true
    });
  }).drop();

  lazyLoadTask = task(function*() {
    const {mapsTradeFetcher, tradeMapIds, tradeMaps, isMapsInitiallyLoaded} = this;

    if (!isMapsInitiallyLoaded) return null;

    const {tradeMaps: newTradeMaps, tradeMapIds: updatedTradeMapIds} = yield mapsTradeFetcher.fetchFromIds(tradeMapIds);

    tradeMaps.addObjects(newTradeMaps);

    this.set('tradeMapIds', updatedTradeMapIds);
  }).drop();

  didReceiveAttrs() {
    if (!this.map.isTradable) return;

    this.tradeMaps.clear();
    this.get('initialLoadTask').perform();
  }
}
