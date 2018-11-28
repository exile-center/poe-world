// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';
import PRIVATE_API from 'poe-world/constants/private-api';

export default class StateFetcher extends Service {
  @service('-electron/request')
  electronRequest;

  @service('authentication/setting')
  authenticationSetting;

  @service('active-league/setting')
  activeLeagueSetting;

  fetch() {
    const leagueId = this.activeLeagueSetting.league.id;
    const account = this.authenticationSetting.account;

    return this.electronRequest.privateFetch(
      `${PRIVATE_API.CHARACTER_WINDOW_BASE_URL}/get-stash-items?accountName=${account}&league=${leagueId}`,
      {
        toastAuthenticationError: false
      }
    );
  }
}
