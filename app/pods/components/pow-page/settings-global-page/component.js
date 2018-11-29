// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {task, timeout} from 'ember-concurrency';
import {reads} from '@ember-decorators/object/computed';

// Constants
const TEST_AUTHENTICATION_DEBOUNCE = 1000; // 1 second

export default class PageSettingsGlobal extends Component {
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

  leaguesLoadTask = task(function*() {
    const leagues = yield this.leaguesFetcher.fetch();
    this.set('leagues', leagues);
  }).drop();

  debouncedTestAuthenticationTask = task(function*() {
    yield timeout(TEST_AUTHENTICATION_DEBOUNCE);
    yield this.get('testAuthenticationTask').perform();
  }).restartable();

  testAuthenticationTask = task(function*() {
    yield this.authenticationStateFetcher.fetch();
  }).drop();

  willInsertElement() {
    this.get('leaguesLoadTask').perform();
    this.get('testAuthenticationTask').perform();
  }

  applyLeague(league) {
    this.activeLeagueSetting.apply(league);
  }

  applyPoesessid(poesessid) {
    this.authenticationSetting.applyPoesessid(poesessid);
    this.get('debouncedTestAuthenticationTask').perform();
  }

  applyAccount(account) {
    this.authenticationSetting.applyAccount(account);
    this.get('debouncedTestAuthenticationTask').perform();
  }

  openDevTools() {
    this.electronDevTools.open();
  }
}
