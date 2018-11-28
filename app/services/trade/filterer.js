// Vendor
import Service from '@ember/service';

// Utilities
import substringSearch from 'poe-world/utilities/substring-search';

export default class Filterer extends Service {
  filter(trades, searchValue) {
    return trades.filter(trade => {
      return searchValue.split(',').every(searchTerm => this._compare(trade, searchTerm));
    });
  }

  _compare(trade, searchTerm) {
    if (substringSearch(trade.label, searchTerm)) return true;
    if (trade.tags.toArray().some(tag => substringSearch(tag, searchTerm))) return true;

    return false;
  }
}
