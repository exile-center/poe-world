// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';

export default class Persister extends Service {
  @service('dexie')
  dexie;

  async persist(widget) {
    const id = await this.dexie.getTable('dashboardWidgets').put(widget.asJson());
    widget.set('id', id);

    return widget;
  }
}
