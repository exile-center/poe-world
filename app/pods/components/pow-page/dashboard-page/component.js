// Vendor
import Component from '@ember/component';
import {action} from '@ember-decorators/object';
import {service} from '@ember-decorators/service';
import {tagName} from '@ember-decorators/component';

// Models
import Dashboard from 'poe-world/models/dashboard';

@tagName('')
export default class PageDashboard extends Component {
  @service('dashboard/persister')
  dashboardPersister;

  @service('dashboard/fetcher')
  dashboardFetcher;

  dashboards = [];
  activeDashboard = null;
  widgetsAreLocked = true;

  willInsertElement() {
    this._refreshDashboards();
    const activeDashboard = this.dashboards[0] || null;

    this.setProperties({
      activeDashboard,
      widgetsAreLocked: activeDashboard && activeDashboard.hasWidgets
    });
  }

  @action
  selectDashboard(dashboard) {
    this.setProperties({
      activeDashboard: dashboard,
      widgetsAreLocked: dashboard.hasWidgets
    });
  }

  @action
  updateDashboards(dashboards) {
    this.set('dashboards', dashboards);
  }

  @action
  toggleWidgetsLock() {
    this.toggleProperty('widgetsAreLocked');
  }

  @action
  createDashboard() {
    const newDashboard = this.dashboardPersister.persist(Dashboard.create());
    this._refreshDashboards();
    this.set('activeDashboard', newDashboard);
  }

  @action
  updateActiveDashboard(newProperties) {
    this.activeDashboard.setProperties(newProperties);
    this.dashboardPersister.persist(this.activeDashboard);
  }

  @action
  addWidget(columnIndex, widget) {
    this.activeDashboard.addWidget({
      type: widget.type,
      state: widget.state,
      settings: widget.settings
    }, columnIndex);

    this.dashboardPersister.persist(this.activeDashboard);
  }

  @action
  updateWidget(columnIndex, widgetIndex, widget) {
    this.activeDashboard.updateWidget(columnIndex, widgetIndex, widget);
    this.dashboardPersister.persist(this.activeDashboard);
  }

  @action
  deleteWidget(columnIndex, widgetIndex) {
    this.activeDashboard.removeWidget(columnIndex, widgetIndex);
    this.dashboardPersister.persist(this.activeDashboard);
  }

  _refreshDashboards() {
    this.set('dashboards', this.dashboardFetcher.fetchAll());
  }
}
