import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {task, timeout} from 'ember-concurrency';
import {readOnly} from '@ember/object/computed';

// Constants
const TEST_AUTHENTICATION_DEBOUNCE = 1000; // 1 second

export default Component.extend({
  electronDevTools: service('-electron/dev-tools'),
  globalState: service('global-state'),
  leaguesFetcher: service('leagues/fetcher'),
  activeLeagueSetting: service('active-league/setting'),
  authenticationSetting: service('authentication/setting'),
  authenticationStateFetcher: service('authentication/state-fetcher'),

  currentLeagueSlug: readOnly('activeLeagueSetting.league.slug'),
  currentPoesessid: readOnly('authenticationSetting.poesessid'),
  currentAccount: readOnly('authenticationSetting.account'),
  isAuthenticated: readOnly('globalState.isAuthenticated'),

  leagues: [],

  leaguesLoadTask: task(function *() {
    const leagues = yield this.leaguesFetcher.fetch();
    this.set('leagues', leagues);
  }).drop(),

  debouncedTestAuthenticationTask: task(function *() {
    yield timeout(TEST_AUTHENTICATION_DEBOUNCE);
    yield this.testAuthenticationTask.perform();
  }).restartable(),

  testAuthenticationTask: task(function *() {
    yield this.authenticationStateFetcher.fetch();
  }).drop(),

  willInsertElement() {
    this.leaguesLoadTask.perform();
    this.testAuthenticationTask.perform();
  },

  applyLeague(league) {
    this.activeLeagueSetting.apply(league);
  },

  applyPoesessid(poesessid) {
    this.authenticationSetting.applyPoesessid(poesessid);
    this.debouncedTestAuthenticationTask.perform();
  },

  applyAccount(account) {
    this.authenticationSetting.applyAccount(account);
    this.debouncedTestAuthenticationTask.perform();
  },

  openDevTools() {
    this.electronDevTools.open();
  }
});
