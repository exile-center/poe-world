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
    const dashboards = this.dashboardFetcher.fetchAll();
    if (!dashboards.length) dashboards.push(this.dashboardPersister.persist(Dashboard.create()));

    const activeDashboard = dashboards[0];

    this.setProperties({
      dashboards,
      activeDashboard,
      widgetsAreLocked: activeDashboard.hasWidgets
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
}
