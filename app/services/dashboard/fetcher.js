// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';

// Constants
import STORAGE_KEYS from 'poe-world/constants/storage-keys';

// Models
import Dashboard from 'poe-world/models/dashboard';

export default class Fetcher extends Service {
  @service('storage')
  storage;

  fetchAll() {
    const rawDashboards = this.storage.getValue(STORAGE_KEYS.DASHBOARD, {
      defaultValue: []
    });

    return rawDashboards.map(rawDashboard => Dashboard.create(rawDashboard));
  }
}
