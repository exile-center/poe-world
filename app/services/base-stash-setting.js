// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';

export default class BaseStashSetting extends Service {
  @service('storage')
  storage;

  @service('active-league/setting')
  activeLeagueSetting;

  get storageKey() {
    return null;
  }

  stashIds = null;

  applyStashIds(stashIds) {
    this.set('stashIds', stashIds);
    this.storage.setValue(this.storageKey, stashIds, {
      leagueSlug: this.activeLeagueSetting.league.slug
    });
  }

  constructor() {
    super(...arguments);

    if (!this.storageKey) {
      throw new Error(`get storageKey() must be implemented on the setting service.`);
    }

    this.set(
      'stashIds',
      this.storage.getValue(this.storageKey, {
        defaultValue: [],
        leagueSlug: this.activeLeagueSetting.league.slug
      })
    );
  }
}
