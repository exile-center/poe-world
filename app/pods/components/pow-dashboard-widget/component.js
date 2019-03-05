// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type, shapeOf, optional} from '@ember-decorators/argument/type';
import {action, computed} from '@ember-decorators/object';
import {and} from '@ember-decorators/object/computed';
import {tagName} from '@ember-decorators/component';

// Constants
import DASHBOARD_WIDGETS from 'poe-world/constants/dashboard-widgets';

@tagName('')
export default class DashboardWidget extends Component {
  @argument
  @type(
    shapeOf({
      type: 'string',
      state: optional('object'),
      settings: optional('object')
    })
  )
  widget;

  @argument
  @type('boolean')
  isLocked;

  @argument
  @type(Function)
  onUpdate;

  @argument
  @type(Function)
  onDelete;

  loadTask = null;
  isSettingsModalOpen = false;

  @and('loadTask', 'loadTask.isRunning')
  isLoading;

  @computed('widget.type')
  get widgetDefinition() {
    return DASHBOARD_WIDGETS[this.widget.type];
  }

  @computed('widgetDefinition')
  get resolvedComponent() {
    return `pow-dashboard-widget/${this.widgetDefinition.component}`;
  }

  @computed('widgetDefinition')
  get resolvedSettingsComponent() {
    if (!this.widgetDefinition.settings) return null;

    return `pow-dashboard-widget/${this.widgetDefinition.component}-settings`;
  }

  @action
  updateState(newState) {
    this.onUpdate({
      ...this.widget,
      state: newState
    });
  }

  @action
  updateSettings(newSettings) {
    this.onUpdate({
      ...this.widget,
      settings: newSettings
    });
  }

  @action
  setupLoadTask(task) {
    this.set('loadTask', task);
  }

  @action
  openSettingsModal() {
    this.set('isSettingsModalOpen', true);
  }

  @action
  closeSettingsModal() {
    this.set('isSettingsModalOpen', false);
  }
}
