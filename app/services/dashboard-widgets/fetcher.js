// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';
import {A as emberArray} from '@ember/array';

// Models
import DashboardWidget from 'poe-world/models/dexie/dashboard-widget';

export default class Fetcher extends Service {
  @service('dexie')
  dexie;

  async fetchFor(dashboard) {
    const rawDashboardWidgets = await this.dexie
      .getTable('dashboardWidgets')
      .where({dashboardId: dashboard.id})
      .toArray();

    return emberArray(rawDashboardWidgets.map(rawDashboardWidget => DashboardWidget.create(rawDashboardWidget)));
  }
}
