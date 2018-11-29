// Vendor
import Component from '@ember/component';
import {reads} from '@ember-decorators/object/computed';
import {service} from '@ember-decorators/service';

export default class DesktopContainer extends Component {
  @service('global-state')
  globalState;

  @reads('globalState.isDesktop')
  isDesktop;
}
