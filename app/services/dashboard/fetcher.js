// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';
import {A as emberArray} from '@ember/array';

// Models
import Dashboard from 'poe-world/models/dexie/dashboard';

export default class Fetcher extends Service {
  @service('dexie')
  dexie;

  async fetchAll() {
    const rawDashboards = await this.dexie
      .getTable('dashboards')
      .orderBy('id')
      .toArray();

    return emberArray(rawDashboards.map(rawDashboard => Dashboard.create(rawDashboard)));
  }
}
