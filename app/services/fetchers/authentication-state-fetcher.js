import Service, {inject as service} from '@ember/service';
import PRIVATE_API from 'pow/constants/private-api';

export default Service.extend({
  electronRequest: service('electron/request'),
  authenticationSetting: service('settings/authentication-setting'),
  leagueSetting: service('settings/league-setting'),

  fetch() {
    const leagueId = this.leagueSetting.league.id;
    const account = this.authenticationSetting.account;

    return this.electronRequest.fetch(`${PRIVATE_API.CHARACTER_WINDOW_BASE_URL}/get-stash-items?accountName=${account}&league=${leagueId}`);
  }
});
