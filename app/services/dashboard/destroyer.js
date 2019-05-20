// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';

export default class Destroyer extends Service {
  @service('dexie')
  dexie;

  async destroy(dashboard) {
    if (!dashboard.id) return;

    return this.dexie.getTable('dashboards').delete(dashboard.id);
  }
}
