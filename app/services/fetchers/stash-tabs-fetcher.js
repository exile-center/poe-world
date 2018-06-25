import Service, {inject as service} from '@ember/service';
import StashTab from 'pow/models/stash-tab';
import {Promise} from 'rsvp';
import PRIVATE_API from 'pow/constants/private-api';
import rgbToHexColor from 'pow/utilities/rgbToHexColor';

export default Service.extend({
  electronRequest: service('electron/request'),
  authenticationSetting: service('settings/authentication-setting'),
  leagueSetting: service('settings/league-setting'),
  globalState: service('global-state'),

  fetch() {
    const leagueId = this.leagueSetting.league.id;
    const account = this.authenticationSetting.account;

    if (!this.globalState.isElectron || !account) return Promise.reject(null);

    return this.electronRequest.fetch(`${PRIVATE_API.CHARACTER_WINDOW_BASE_URL}/get-stash-items?accountName=${account}&league=${leagueId}&tabs=1`)
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
