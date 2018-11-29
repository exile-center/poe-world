// Vendor
import {classNames, tagName} from '@ember-decorators/component';
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {reads} from '@ember-decorators/object/computed';

@classNames('navbar', 'fixed-top', 'navbar-dark', 'bg-dark', 'navbar-expand-md')
@tagName('nav')
export default class Navigation extends Component {
  @service('active-league/setting')
  activeLeagueSetting;

  @service('global-state')
  globalState;

  @reads('activeLeagueSetting.league.name')
  leagueName;

  @reads('globalState.isAuthenticated')
  isAuthenticated;
}
