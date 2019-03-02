// Vendor
import Component from '@ember/component';
import {action} from '@ember-decorators/object';
import {service} from '@ember-decorators/service';

// Models
import Dashboard from 'poe-world/models/dashboard';

export default class PageDashboard extends Component {
  @service('dashboard/persister')
  dashboardPersister;

  @service('dashboard/fetcher')
  dashboardFetcher;

  dashboards = [];
  activeDashboard = null;

  willInsertElement() {
    const dashboards = this.dashboardFetcher.fetchAll();

    if (!dashboards.length) dashboards.push(this.dashboardPersister.persist(Dashboard.create()));

    this.setProperties({
      dashboards,
      activeDashboard: dashboards[0]
    });
  }

  @action
  selectDashboard(dashboard) {
    this.set('activeDashboard', dashboard);
  }

  @action
  updateDashboards(dashboards) {
    this.set('dashboards', dashboards);
  }
}
