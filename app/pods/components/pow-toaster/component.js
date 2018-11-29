// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {reads} from '@ember-decorators/object/computed';
import {tagName} from '@ember-decorators/component';

@tagName('')
export default class Toaster extends Component {
  @service('toaster')
  toaster;

  @reads('toaster.toasts')
  toasts;
}
