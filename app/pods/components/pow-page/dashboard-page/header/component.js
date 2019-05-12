// Vendor
import Component from '@ember/component';
import {action} from '@ember-decorators/object';
import {bool} from '@ember-decorators/object/computed';
import {argument} from '@ember-decorators/argument';
import {optional, type, arrayOf} from '@ember-decorators/argument/type';

export default class PageDashboardHeader extends Component {
  @argument
  @type(arrayOf('object'))
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
  onWidgetsLockToggle;

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
    this.onActiveDashboardUpdate(this.stagedValues);
    this.set('stagedValues', null);
  }
}
