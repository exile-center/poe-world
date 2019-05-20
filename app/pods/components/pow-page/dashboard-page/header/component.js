// Vendor
import Component from '@ember/component';
import {action} from '@ember-decorators/object';
import {bool} from '@ember-decorators/object/computed';
import {argument} from '@ember-decorators/argument';
import {optional, type, arrayOf} from '@ember-decorators/argument/type';

export default class PageDashboardHeader extends Component {
  @argument
  dashboards;

  @argument
  @type(optional('object'))
  activeDashboard;

  @argument
  @type('boolean')
  widgetsAreLocked;

  @argument
  @type(Function)
  onDashboardSelect;

  @argument
  @type(Function)
  onDashboardCreate;

  @argument
  @type(Function)
  onActiveDashboardUpdate;

  @argument
  @type(Function)
  onActiveDashboardDelete;

  @argument
  @type(Function)
  onWidgetsLockToggle;

  stagedValues = null;
  isSettingsModalOpened = false;

  @bool('stagedValues')
  isEditing;

  @action
  openSettings() {
    this.setProperties({
      isSettingsModalOpened: true,
      stagedValues: this.activeDashboard.getProperties('name')
    });
  }

  @action
  closeSettings() {
    this.setProperties({
      isSettingsModalOpened: false,
      stagedValues: null
    });
  }

  @action
  saveActiveDashboard() {
    this.onActiveDashboardUpdate(this.stagedValues);
    this.send('closeSettings');
  }

  @action
  deleteActiveDashboard() {
    this.onActiveDashboardDelete();
    this.send('closeSettings');
  }
}
