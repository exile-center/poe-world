// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type, optional} from '@ember-decorators/argument/type';

export default class BaseWidgetSettingsComponent extends Component {
  @argument
  @type(optional('object'))
  settings;

  @argument
  @type(Function)
  onSettingsUpdate;
}
