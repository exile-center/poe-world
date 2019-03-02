// Vendor
import Component from '@ember/component';
import {action} from '@ember-decorators/object';
import {service} from '@ember-decorators/service';
import {argument} from "@ember-decorators/argument";
import {optional, type, arrayOf} from '@ember-decorators/argument/type';

// Constants
import DASHBOARD_WIDGETS from 'poe-world/constants/dashboard-widgets';


export default class PageDashboardWidgetBoard extends Component {
  @service('dashboard/persister')
  dashboardPersister;

  @argument
  @type('object')
  activeDashboard;

  availableWidgets = Object.values(DASHBOARD_WIDGETS);
  widgetsAreLocked = true;

  @action
  toggleWidgetsLock() {
    this.toggleProperty('widgetsAreLocked');
  }

  @action
  addWidget(widget, columnIndex) {
    this.activeDashboard.widgets.objectAt(columnIndex).addObject({
      type: widget.type,
      state: widget.state,
      settings: widget.settings
    });

    this.dashboardPersister.persist(this.activeDashboard);
  }

  @action
  updateWidget(widget) {
    console.log('updating', widget);
  }
}
