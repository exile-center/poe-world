import Service, {inject as service} from '@ember/service';
import League from 'poe-world/models/league';
import RESOURCES from 'poe-world/constants/resources';

export default Service.extend({
  request: service('request'),

  _leaguesPromise: null,

  fetch() {
    if (this._leaguesPromise) return this._leaguesPromise;

    const leaguesPromise = this.request.fetch(RESOURCES.LEAGUES_JSON_URL).then((rawLeagues) => {
      return rawLeagues.map((rawLeague) => League.create(rawLeague));
    });

    this.set('_leaguesPromise', leaguesPromise);
    return leaguesPromise;
  }
});
