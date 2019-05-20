// Vendor
import Component from '@ember/component';
import {action} from '@ember-decorators/object';
import {service} from '@ember-decorators/service';
import {tagName} from '@ember-decorators/component';
import {task} from 'ember-concurrency';

// Models
import Dashboard from 'poe-world/models/dexie/dashboard';

@tagName('')
export default class PageDashboard extends Component {
  @service('dashboard/persister')
  dashboardPersister;

  @service('dashboard/destroyer')
  dashboardDestroyer;

  @service('dashboard/fetcher')
  dashboardFetcher;

  dashboards = [];
  activeDashboard = null;
  widgetsAreLocked = true;

  initialLoadDashboardsTask = task(function*() {
    const dashboards = yield this.dashboardFetcher.fetchAll();
    const activeDashboard = dashboards.firstObject;

    const hasWidget = true;

    this.setProperties({
      dashboards,
      activeDashboard,
      widgetsAreLocked: !!activeDashboard && hasWidget
    });
  }).drop();

  willInsertElement() {
    this.get('initialLoadDashboardsTask').perform();
  }

  @action
  selectDashboard(dashboard) {
    this.setProperties({
      activeDashboard: dashboard
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
  async createDashboard() {
    const newDashboard =  await this.dashboardPersister.persist(Dashboard.create());
    this.dashboards.addObject(newDashboard);
    this.set('activeDashboard', newDashboard);
  }

  @action
  updateActiveDashboard(newProperties) {
    this.activeDashboard.setProperties(newProperties);
    this.dashboardPersister.persist(this.activeDashboard);
  }

  @action
  deleteActiveDashboard() {
    const dashboardToDelete = this.activeDashboard;

    this.set('activeDashboard', this.dashboards.firstObject);

    this.dashboards.removeObject(dashboardToDelete);
    this.dashboardDestroyer.destroy(dashboardToDelete);
  }

  @action
  addWidget(columnIndex, widget) {
    // TODO: rework
    this.activeDashboard.addWidget(
      {
        type: widget.type,
        state: widget.state,
        settings: widget.settings
      },
      columnIndex
    );

    this.dashboardPersister.persist(this.activeDashboard);
  }

  @action
  // TODO: rework
  updateWidget(columnIndex, widgetIndex, widget) {
    this.activeDashboard.updateWidget(columnIndex, widgetIndex, widget);
    this.dashboardPersister.persist(this.activeDashboard);
  }

  @action
  // TODO: rework
  deleteWidget(columnIndex, widgetIndex) {
    this.activeDashboard.removeWidget(columnIndex, widgetIndex);
    this.dashboardPersister.persist(this.activeDashboard);
  }
}
