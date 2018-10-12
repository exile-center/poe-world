import Service, {inject as service} from '@ember/service';
import StashTab from 'poe-world/models/stash-tab';
import {Promise} from 'rsvp';
import PRIVATE_API from 'poe-world/constants/private-api';
import rgbToHexColor from 'poe-world/utilities/rgbToHexColor';

export default Service.extend({
  electronRequest: service('-electron/request'),
  authenticationSetting: service('authentication/setting'),
  activeLeagueSetting: service('active-league/setting'),
  globalState: service('global-state'),

  fetch() {
    const leagueId = this.activeLeagueSetting.league.id;
    const account = this.authenticationSetting.account;

    if (!this.globalState.isElectron || !account) return Promise.reject(null);

    return this.electronRequest.privateFetch(`${PRIVATE_API.CHARACTER_WINDOW_BASE_URL}/get-stash-items?accountName=${account}&league=${leagueId}&tabs=1`)
      .then(({tabs: rawTabs}) => {
        return rawTabs.map((rawTab) => StashTab.create({
          id: rawTab.id,
          name: rawTab.n,
          type: rawTab.type.replace(/stash$/i, ''),
          index: rawTab.i,
          color: rgbToHexColor(...Object.values(rawTab.colour))
        }));
      });
  }
});
