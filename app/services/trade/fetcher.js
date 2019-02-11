// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';

// Constants
import STORAGE_KEYS from 'poe-world/constants/storage-keys';

// Models
import Trade from 'poe-world/models/trade';

export default class Fetcher extends Service {
  @service('storage')
  storage;

  fetchAll() {
    const rawTrades = this.storage.getValue(STORAGE_KEYS.TRADE, {
      defaultValue: []
    });

    return rawTrades
      .map(rawTrade => Trade.create(rawTrade))
      .sort((tradeA, tradeB) => tradeB.updatedAt.localeCompare(tradeA.updatedAt));
  }
}
