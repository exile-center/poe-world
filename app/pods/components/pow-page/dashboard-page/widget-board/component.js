// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {argument} from '@ember-decorators/argument';
import {type} from '@ember-decorators/argument/type';

// Constants
import DASHBOARD_WIDGETS from 'poe-world/constants/dashboard-widgets';

export default class PageDashboardWidgetBoard extends Component {
  @service('dashboard/persister')
  dashboardPersister;

  @argument
  @type('object')
  activeDashboard;

  @argument
  @type('boolean')
  widgetsAreLocked;

  @argument
  @type(Function)
  addWidget;

  @argument
  @type(Function)
  updateWidget;

  @argument
  @type(Function)
  deleteWidget;

  availableWidgets = Object.values(DASHBOARD_WIDGETS);
}
