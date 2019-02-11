// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {argument} from '@ember-decorators/argument';
import {type} from '@ember-decorators/argument/type';
import {computed} from '@ember-decorators/object';

export default class TradeList extends Component {
  @service('trade/fetcher')
  tradeFetcher;

  @service('trade/filterer')
  tradeFilterer;

  @argument
  @type(Function)
  onSelect;

  trades = [];
  searchValue = '';

  @computed('trades', 'searchValue')
  get filteredTrades() {
    if (!this.searchValue) return this.trades;

    return this.tradeFilterer.filter(this.trades, this.searchValue);
  }

  willInsertElement() {
    const trades = this.tradeFetcher.fetchAll();
    if (!trades.length) return;

    this.setProperties({trades});
  }
}
