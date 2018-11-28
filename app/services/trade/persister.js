// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';

// Utilities
import uuid from 'poe-world/utilities/uuid';

// Constants
import STORAGE_KEYS from 'poe-world/constants/storage-keys';

export default class Persister extends Service {
  @service('storage')
  storage;

  persist(trade) {
    if (!trade.id) trade.set('id', uuid());

    const trades = this.storage.getValue(STORAGE_KEYS.TRADE, {
      defaultValue: []
    });
    const existingTrade = trades.find(({id}) => id === trade.id);

    if (existingTrade) {
      Object.assign(existingTrade, trade.asJson());
    } else {
      trades.unshift(trade.asJson());
    }

    this.storage.setValue(STORAGE_KEYS.TRADE, trades);

    return trade;
  }
}
