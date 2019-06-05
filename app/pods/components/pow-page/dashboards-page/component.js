// Vendor
import Component from '@ember/component';
import {action, computed} from '@ember-decorators/object';
import {service} from '@ember-decorators/service';
import {tagName} from '@ember-decorators/component';
import {task} from 'ember-concurrency';

// Models
import Dashboard from 'poe-world/models/dexie/dashboard';
import DashboardWidget from 'poe-world/models/dexie/dashboard-widget';

// Constants
import DASHBOARD_PRESETS from 'poe-world/constants/dashboard-presets';

@tagName('')
export default class PageDashboards extends Component {
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
      yield this._createWelcomeDashboard();
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
    await this._createDashboard({});
  }

  @action
  updateActiveDashboard(newProperties) {
    this.activeDashboard.setProperties(newProperties);
    this.dashboardPersister.persist(this.activeDashboard);
  }

  @action
  async deleteActiveDashboard() {
    const dashboardToDelete = this.activeDashboard;
    const widgetIdsToDelete = this.activeDashboardWidgets.mapBy('id');

    this.dashboards.removeObject(dashboardToDelete);
    this.setProperties({
      activeDashboard: this.dashboards.firstObject,
      activeDashboardWidgets: null
    });

    await this.get('refreshWidgetsTask').perform();
    await this.dashboardWidgetsDestroyer.destroyWidgetIds(widgetIdsToDelete);
    await this.dashboardDestroyer.destroy(dashboardToDelete);
  }

  @action
  async addWidget(column, row, widget) {
    this._addWidgetToActiveDashboard({
      type: widget.type,
      state: widget.state,
      params: widget.params,
      settings: widget.settings,
      column,
      row
    });
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

  async _createDashboard(properties) {
    const newDashboard = await this.dashboardPersister.persist(Dashboard.create(properties));

    this.dashboards.addObject(newDashboard);
    this._changeActiveDashboard(newDashboard);

    return newDashboard;
  }

  async _createWelcomeDashboard() {
    const welcomePreset = DASHBOARD_PRESETS[0];

    await this._createDashboard({
      name: welcomePreset.name
    });

    welcomePreset.widgets.forEach(widget => this._addWidgetToActiveDashboard(widget));
  }

  _changeActiveDashboard(dashboard) {
    this.set('activeDashboard', dashboard);
    this.get('refreshWidgetsTask').perform();
  }

  async _addWidgetToActiveDashboard(widgetProperties) {
    const newWidget = await this.dashboardWidgetsPersister.persist(
      DashboardWidget.create({
        ...widgetProperties,
        dashboardId: this.activeDashboard.id
      })
    );

    this.activeDashboardWidgets.addObject(newWidget);
  }
}
