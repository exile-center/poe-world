// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';
import StashTab from 'poe-world/models/stash-tab';
import PRIVATE_API from 'poe-world/constants/private-api';
import rgbToHexColor from 'poe-world/utilities/rgb-to-hex-color';

export default class TabsFetcher extends Service {
  @service('-electron/request')
  electronRequest;

  @service('authentication/setting')
  authenticationSetting;

  @service('active-league/setting')
  activeLeagueSetting;

  fetch() {
    const leagueId = this.activeLeagueSetting.league.id;
    const account = this.authenticationSetting.account;

    return this.electronRequest
      .privateFetch(
        `${PRIVATE_API.CHARACTER_WINDOW_BASE_URL}/get-stash-items?accountName=${account}&league=${leagueId}&tabs=1`
      )
      .then(({tabs: rawTabs}) => {
        return rawTabs.map(rawTab =>
          StashTab.create({
            id: rawTab.id,
            name: rawTab.n,
            type: rawTab.type.replace(/stash$/i, ''),
            index: rawTab.i,
            color: rgbToHexColor(...Object.values(rawTab.colour))
          })
        );
      });
  }
}
