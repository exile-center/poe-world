// Vendors
import Service, {inject as service} from '@ember/service';

// Constants
import STORAGE_KEYS from 'poe-world/constants/storage-keys';

export default Service.extend({
  storage: service('storage'),

  fetchAll() {
    return this.storage.getValue(STORAGE_KEYS.TRADE, {
      defaultValue: []
    });
  }
});

