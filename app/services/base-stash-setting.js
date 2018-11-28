// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';

export default class BaseStashSetting extends Service {
  @service('storage')
  storage;

  @service('active-league/setting')
  activeLeagueSetting;

  storageKey = null;
  stashIds = null;

  applyStashIds(stashIds) {
    this.set('stashIds', stashIds);
    this.storage.setValue(this.storageKey, stashIds, {
      leagueSlug: this.activeLeagueSetting.league.slug
    });
  }

  init() {
    super.init(...arguments);

    this.set(
      'stashIds',
      this.storage.getValue(this.storageKey, {
        defaultValue: [],
        leagueSlug: this.activeLeagueSetting.league.slug
      })
    );
  }
}
