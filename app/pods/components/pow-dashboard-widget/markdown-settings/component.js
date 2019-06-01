// Vendor
import {action} from '@ember-decorators/object';

// Base widget
import BaseWidgetSettingsComponent from '../base-widget-settings-component';

export default class extends BaseWidgetSettingsComponent {
  @action
  updateContent(content) {
    this.onSettingsUpdate({
      content
    });
  }
}
