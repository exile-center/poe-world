// Vendor
import Component from '@ember/component';
import {action} from '@ember-decorators/object';
import {bool} from '@ember-decorators/object/computed';
import {service} from '@ember-decorators/service';
import {argument} from '@ember-decorators/argument';
import {optional, type, arrayOf} from '@ember-decorators/argument/type';

// Models
import Dashboard from 'poe-world/models/dashboard';

export default class PageDashboardManager extends Component {
  @service('dashboard/persister')
  dashboardPersister;

  @argument
  @type(arrayOf('object'))
  dashboards;

  @argument
  @type(optional('object'))
  activeDashboard;

  @argument
  @type(Function)
  onDashboardSelect;

  @argument
  @type(Function)
  onDashboardsUpdate;

  stagedValues = null;

  @bool('stagedValues')
  isEditing;

  @action
  edit() {
    this.set('stagedValues', this.activeDashboard.getProperties('label'));
  }

  @action
  cancel() {
    this.set('stagedValues', null);
  }

  @action
  save() {
    this.activeDashboard.setProperties(this.stagedValues);
    this.dashboardPersister.persist(this.activeDashboard);

    this.set('stagedValues', null);
  }

  @action
  create() {
    const newDashboard = this.dashboardPersister.persist(Dashboard.create());

    this.onDashboardsUpdate(this.dashboards.concat(newDashboard));
    this.onDashboardSelect(newDashboard);
  }
}
