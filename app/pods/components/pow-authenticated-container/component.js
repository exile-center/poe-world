// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {reads} from '@ember-decorators/object/computed';

export default class AuthenticatedContainer extends Component {
  @service('global-state')
  globalState;

  @reads('globalState.isAuthenticated')
  isAuthenticated;
}
