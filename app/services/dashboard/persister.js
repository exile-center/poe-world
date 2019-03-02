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

  persist(dashboard) {
    if (!dashboard.id) dashboard.set('id', uuid());

    const dashboards = this.storage.getValue(STORAGE_KEYS.DASHBOARD, {
      defaultValue: []
    });
    const existingDashboard = dashboards.find(({id}) => id === dashboard.id);

    if (existingDashboard) {
      Object.assign(existingDashboard, dashboard.asJson());
    } else {
      dashboards.push(dashboard.asJson());
    }

    this.storage.setValue(STORAGE_KEYS.DASHBOARD, dashboards);

    return dashboard;
  }
}
