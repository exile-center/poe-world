// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';
import League from 'poe-world/models/league';

// Constants
import POE_API from 'poe-world/constants/poe-api';
const SSF_RULE_NAME = 'Solo';

export default class Fetcher extends Service {
  @service('request')
  request;

  _leaguesPromise = null;

  fetch() {
    if (this._leaguesPromise) return this._leaguesPromise;

    const leaguesPromise = this.request.fetch(`${POE_API.BASE_URL}/leagues`).then(rawLeagues => {
      return rawLeagues.filter(rawLeague => this._filter(rawLeague)).map(rawLeague => League.create(rawLeague));
    });

    this.set('_leaguesPromise', leaguesPromise);
    return leaguesPromise;
  }

  _filter(rawLeague) {
    return !rawLeague.rules.find(({name}) => name === SSF_RULE_NAME);
  }
}
