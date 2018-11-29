// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {reads} from '@ember-decorators/object/computed';

export default class Toaster extends Component {
  localClassNames = 'toaster';

  @service('toaster')
  toaster;

  @reads('toaster.toasts')
  toasts;
}
