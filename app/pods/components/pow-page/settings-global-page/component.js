// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {dropTask, restartableTask} from 'ember-concurrency-decorators';
import {timeout} from 'ember-concurrency';
import {reads} from '@ember-decorators/object/computed';

// Constants
const TEST_AUTHENTICATION_DEBOUNCE = 1000; // 1 second

export default class Component extends Component {
  @service('-electron/dev-tools')
  electronDevTools;

  @service('global-state')
  globalState;

  @service('leagues/fetcher')
  leaguesFetcher;

  @service('active-league/setting')
  activeLeagueSetting;

  @service('authentication/setting')
  authenticationSetting;

  @service('authentication/state-fetcher')
  authenticationStateFetcher;

  @reads('activeLeagueSetting.league.slug')
  currentLeagueSlug;

  @reads('authenticationSetting.poesessid')
  currentPoesessid;

  @reads('authenticationSetting.account')
  currentAccount;

  @reads('globalState.isAuthenticated')
  isAuthenticated;

  leagues = null;

  @dropTask
  leaguesLoadTask = function*() {
    const leagues = yield this.leaguesFetcher.fetch();
    this.set('leagues', leagues);
  };

  @restartableTask
  debouncedTestAuthenticationTask = function*() {
    yield timeout(TEST_AUTHENTICATION_DEBOUNCE);
    yield this.testAuthenticationTask.perform();
  };

  @dropTask
  testAuthenticationTask = function*() {
    yield this.authenticationStateFetcher.fetch();
  };

  willInsertElement() {
    this.leaguesLoadTask.perform();
    this.testAuthenticationTask.perform();
  }

  applyLeague(league) {
    this.activeLeagueSetting.apply(league);
  }

  applyPoesessid(poesessid) {
    this.authenticationSetting.applyPoesessid(poesessid);
    this.debouncedTestAuthenticationTask.perform();
  }

  applyAccount(account) {
    this.authenticationSetting.applyAccount(account);
    this.debouncedTestAuthenticationTask.perform();
  }

  openDevTools() {
    this.electronDevTools.open();
  }
}
