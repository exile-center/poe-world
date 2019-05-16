// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';

// Constants
import STORAGE_KEYS from 'poe-world/constants/storage-keys';

export default class Destroyer extends Service {
  @service('storage')
  storage;

  destroy(dashboard) {
    if (!dashboard.id) return;

    const dashboards = this.storage.getValue(STORAGE_KEYS.DASHBOARD, {
      defaultValue: []
    });
    const newDashboards = dashboards.filter(existingDashboard => existingDashboard.id !== dashboard.id);

    this.storage.setValue(STORAGE_KEYS.DASHBOARD, newDashboards);
  }
}
