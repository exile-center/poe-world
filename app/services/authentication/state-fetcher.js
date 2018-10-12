import Service, {inject as service} from '@ember/service';
import {Promise} from 'rsvp';
import PRIVATE_API from 'poe-world/constants/private-api';

export default Service.extend({
  electronRequest: service('-electron/request'),
  authenticationSetting: service('authentication/setting'),
  activeLeagueSetting: service('active-league/setting'),
  globalState: service('global-state'),

  fetch() {
    const leagueId = this.activeLeagueSetting.league.id;
    const account = this.authenticationSetting.account;

    if (!this.globalState.isElectron || !account) return Promise.reject(null);

    return this.electronRequest.privateFetch(`${PRIVATE_API.CHARACTER_WINDOW_BASE_URL}/get-stash-items?accountName=${account}&league=${leagueId}`, {
      toastAuthenticationError: false
    });
  }
});
