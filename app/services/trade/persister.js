// Vendors
import Service, {inject as service} from '@ember/service';

// Utilities
import uuid from 'poe-world/utilities/uuid';

// Constants
import STORAGE_KEYS from 'poe-world/constants/storage-keys';

export default Service.extend({
  storage: service('storage'),

  persist(trade) {
    if (!trade.id) trade.id = uuid();

    const trades = this.storage.getValue(STORAGE_KEYS.TRADE, {
      defaultValue: []
    });

    const existingTrade = trades.find(({id}) => id === trade.id);

    if (existingTrade) {
      Object.assign(existingTrade, trade);
    } else {
      trades.unshift(trade);
    }

    this.storage.setValue(STORAGE_KEYS.TRADE, trades);

    return trade;
  }
});

