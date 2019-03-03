// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type, optional} from '@ember-decorators/argument/type';

export default class BaseWidgetComponent extends Component {
  @argument
  @type(optional('object'))
  state;

  @argument
  @type(optional('object'))
  settings;

  @argument
  @type(optional('object'))
  params;

  @argument
  @type(Function)
  onStateUpdate;

  @argument
  @type(Function)
  onSetupLoadTask;
}
