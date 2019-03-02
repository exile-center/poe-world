// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type, shapeOf, optional} from '@ember-decorators/argument/type';
import {action, computed} from '@ember-decorators/object';

// Constants
import DASHBOARD_WIDGETS from 'poe-world/constants/dashboard-widgets';

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

  @computed('widget.type')
  get widgetDefinition() {
    return DASHBOARD_WIDGETS[this.widget.type];
  }

  @computed('widgetDefinition')
  get resolvedComponent() {
    return `pow-dashboard-widget/${this.widgetDefinition.component}`;
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
}
