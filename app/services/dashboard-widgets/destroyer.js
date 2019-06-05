// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';

export default class Destroyer extends Service {
  @service('dexie')
  dexie;

  async destroy(widget) {
    if (!widget.id) return;

    return this.dexie.getTable('dashboardWidgets').delete(widget.id);
  }

  async destroyWidgetIds(widgetIds) {
    return this.dexie.getTable('dashboardWidgets').bulkDelete(widgetIds);
  }
}
