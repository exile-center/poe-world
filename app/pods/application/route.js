import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({
  leaguesFetcher: service('leagues/fetcher'),
  activeLeagueSetting: service('active-league/setting'),

  model() {
    return this.leaguesFetcher.fetch();
  },

  afterModel(leagues) {
    this.activeLeagueSetting.initializeFrom(leagues);
  }
});
