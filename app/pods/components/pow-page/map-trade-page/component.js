// Vendor
import {A} from '@ember/array';
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {dropTask} from 'ember-concurrency-decorators';

export default class Component extends Component {
  @service('maps/trade-fetcher')
  mapsTradeFetcher;

  map = null;
  tradeMapIds = null;
  tradeMaps = A([]);
  isMapsInitiallyLoaded = false;

  @dropTask
  initialLoadTask = function*() {
    const {mapsTradeFetcher, map, tradeMaps} = this;
    const {tradeMaps: newTradeMaps, tradeMapIds, total} = yield mapsTradeFetcher.fetchFromMap(map);

    tradeMaps.addObjects(newTradeMaps);

    this.setProperties({
      tradeMapIds,
      total,
      isMapsInitiallyLoaded: true
    });
  };

  @dropTask
  lazyLoadTask = function*() {
    const {mapsTradeFetcher, tradeMapIds, tradeMaps, isMapsInitiallyLoaded} = this;

    if (!isMapsInitiallyLoaded) return null;

    const {tradeMaps: newTradeMaps, tradeMapIds: updatedTradeMapIds} = yield mapsTradeFetcher.fetchFromIds(tradeMapIds);

    tradeMaps.addObjects(newTradeMaps);

    this.set('tradeMapIds', updatedTradeMapIds);
  };

  didReceiveAttrs() {
    if (!this.map.isTradable) return;

    this.tradeMaps.clear();
    this.initialLoadTask.perform();
  }
}
