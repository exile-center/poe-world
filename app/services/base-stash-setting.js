import Service, {inject as service} from '@ember/service';

export default Service.extend({
  storage: service('storage'),
  activeLeagueSetting: service('active-league/setting'),

  storageKey: null,
  stashIds: [],

  applyStashIds(stashIds) {
    this.set('stashIds', stashIds);
    this.storage.setValue(this.storageKey, stashIds, {
      leagueSlug: this.activeLeagueSetting.league.slug
    });
  },

  init() {
    this._super(...arguments);

    this.set('stashIds', this.storage.getValue(this.storageKey, {
      defaultValue: [],
      leagueSlug: this.activeLeagueSetting.league.slug
    }));
  }
});

