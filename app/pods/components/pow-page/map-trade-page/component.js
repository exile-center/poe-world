import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency';
import Ember from 'ember';

export default Component.extend({
  mapsTradeFetcher: service('maps/trade-fetcher'),

  map: null,

  tradeMapIds: [],
  tradeMaps: Ember.A([]),
  isMapsInitiallyLoaded: false,

  initialLoadTask: task(function *() {
    const {mapsTradeFetcher, map, tradeMaps} = this.getProperties('mapsTradeFetcher', 'map', 'tradeMaps');
    const {tradeMaps: newTradeMaps, tradeMapIds, total} = yield mapsTradeFetcher.fetchFromMap(map);

    tradeMaps.addObjects(newTradeMaps);

    this.setProperties({
      tradeMapIds,
      total,
      isMapsInitiallyLoaded: true
    });
  }).drop(),

  lazyLoadTask: task(function *() {
    const {mapsTradeFetcher, tradeMapIds, tradeMaps, isMapsInitiallyLoaded} = this.getProperties('mapsTradeFetcher', 'tradeMapIds', 'tradeMaps', 'isMapsInitiallyLoaded');

    if (!isMapsInitiallyLoaded) return null;

    const {tradeMaps: newTradeMaps, tradeMapIds: updatedTradeMapIds} = yield mapsTradeFetcher.fetchFromIds(tradeMapIds);

    tradeMaps.addObjects(newTradeMaps);

    this.set('tradeMapIds', updatedTradeMapIds);
  }).drop(),

  didReceiveAttrs() {
    if (!this.map.isTradable) return;

    this.tradeMaps.clear();
    this.initialLoadTask.perform();
  }
});
