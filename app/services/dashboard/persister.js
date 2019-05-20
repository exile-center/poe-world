// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';

export default class Persister extends Service {
  @service('dexie')
  dexie;

  async persist(dashboard) {
    const id = await this.dexie.getTable('dashboards').put(dashboard.asJson());
    dashboard.set('id', id);
    return dashboard;
  }
}
