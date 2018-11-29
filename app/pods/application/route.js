// Vendor
import Route from '@ember/routing/route';
import {service} from '@ember-decorators/service';

export default class Application extends Route {
  @service('leagues/fetcher')
  leaguesFetcher;

  @service('authentication/state-fetcher')
  authenticationStateFetcher;

  @service('active-league/setting')
  activeLeagueSetting;

  model() {
    return this.leaguesFetcher.fetch();
  }

  afterModel(leagues) {
    this.activeLeagueSetting.initializeFrom(leagues);

    // There's no point waiting for the response, the electron request
    // service will set the `globalState.isAuthenticated` by itself
    this.authenticationStateFetcher.fetch();
  }
}
