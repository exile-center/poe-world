import Service, {inject as service} from '@ember/service';
import STORAGE_KEYS from 'poe-world/constants/storage-keys';

export default Service.extend({
  storage: service('storage'),
  leaguesFetcher: service('leagues/fetcher'),

  league: null,

  apply(league) {
    this.storage.setValue(STORAGE_KEYS.LEAGUE, league.slug);
    return this.set('league', league);
  },

  initializeFrom(leagues) {
    const currentLeague = this._getCurrentLeagueFrom(leagues);
    const defaultLeague = this._getDefaultLeagueFrom(leagues);

    if (currentLeague) return this.set('league', currentLeague);

    return this.apply(defaultLeague);
  },

  _getCurrentLeagueFrom(leagues) {
    const currentLeagueSlug = this.storage.getValue(STORAGE_KEYS.LEAGUE);

    if (!currentLeagueSlug) return null;

    return leagues.find((league) => league.slug === currentLeagueSlug);
  },

  _getDefaultLeagueFrom(leagues) {
    const applicableLeagues = leagues.filter((league) => !/(hardcode|standard)/i.test(league.id));

    if (applicableLeagues.length > 0) return applicableLeagues[0];

    const standardLeague = leagues.find((league) => /standard/i.test(league.id));

    return standardLeague || null;
  }
});
