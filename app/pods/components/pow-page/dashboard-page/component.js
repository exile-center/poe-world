// Vendor
import Component from '@ember/component';
import {action, computed} from '@ember-decorators/object';
import {service} from '@ember-decorators/service';
import {tagName} from '@ember-decorators/component';
import {task} from 'ember-concurrency';

// Models
import Dashboard from 'poe-world/models/dexie/dashboard';
import DashboardWidget from 'poe-world/models/dexie/dashboard-widget';

@tagName('')
export default class PageDashboard extends Component {
  @service('dashboard/persister')
  dashboardPersister;

  @service('dashboard/destroyer')
  dashboardDestroyer;

  @service('dashboard/fetcher')
  dashboardFetcher;

  @service('dashboard-widgets/persister')
  dashboardWidgetsPersister;

  @service('dashboard-widgets/destroyer')
  dashboardWidgetsDestroyer;

  @service('dashboard-widgets/fetcher')
  dashboardWidgetsFetcher;

  dashboards = null;
  activeDashboard = null;
  activeDashboardWidgets = null;
  widgetsAreLocked = true;

  @computed('activeDashboardWidgets')
  get activeDashboardWidgetsAreLoaded() {
    return this.activeDashboardWidgets !== null;
  }

  initialLoadDashboardsTask = task(function*() {
    const dashboards = yield this.dashboardFetcher.fetchAll();
    const activeDashboard = dashboards.firstObject;

    this.set('dashboards', dashboards);

    if (activeDashboard) {
      this._changeActiveDashboard(activeDashboard);
    } else {
      yield this._createNewDashboard();
    }

    yield this.get('refreshWidgetsTask').perform();

    const hasWidget = !!(this.activeDashboardWidgets && this.activeDashboardWidgets.length);
    this.set('widgetsAreLocked', !!activeDashboard && hasWidget);
  }).drop();

  refreshWidgetsTask = task(function*() {
    if (!this.activeDashboard) return;

    const activeDashboardWidgets = yield this.dashboardWidgetsFetcher.fetchFor(this.activeDashboard);
    this.set('activeDashboardWidgets', activeDashboardWidgets);
  }).drop();

  willInsertElement() {
    this.get('initialLoadDashboardsTask').perform();
  }

  @action
  selectDashboard(dashboard) {
    this._changeActiveDashboard(dashboard);
  }

  @action
  toggleWidgetsLock() {
    this.toggleProperty('widgetsAreLocked');
  }

  @action
  async createDashboard() {
    await this._createNewDashboard();
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
  async addWidget(column, row, widget) {
    const widgetProperties = {
      dashboardId: this.activeDashboard.id,
      type: widget.type,
      state: widget.state,
      params: widget.params,
      settings: widget.settings,
      column,
      row
    };

    const newWidget = await this.dashboardWidgetsPersister.persist(DashboardWidget.create(widgetProperties));
    this.activeDashboardWidgets.addObject(newWidget);
  }

  @action
  updateWidget(widget, newProperties) {
    widget.setProperties(newProperties);
    this.dashboardWidgetsPersister.persist(widget);
  }

  @action
  async deleteWidget(widget) {
    this.activeDashboardWidgets.removeObject(widget);
    await this.dashboardWidgetsDestroyer.destroy(widget);
  }

  async _createNewDashboard() {
    const newDashboard = await this.dashboardPersister.persist(Dashboard.create());

    this.dashboards.addObject(newDashboard);
    this._changeActiveDashboard(newDashboard);
  }

  _changeActiveDashboard(dashboard) {
    this.set('activeDashboard', dashboard);
    this.get('refreshWidgetsTask').perform();
  }
}
