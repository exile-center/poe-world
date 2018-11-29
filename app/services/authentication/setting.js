// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';
import STORAGE_KEYS from 'poe-world/constants/storage-keys';

export default class Setting extends Service {
  @service('storage')
  storage;

  poesessid = null;
  account = null;

  applyAccount(account) {
    this.set('account', account);
    this.storage.setValue(STORAGE_KEYS.ACCOUNT, account);
  }

  applyPoesessid(poesessid) {
    this.set('poesessid', poesessid);
    this.storage.setValue(STORAGE_KEYS.POESESSID, poesessid);
  }

  constructor() {
    super(...arguments);

    this.setProperties({
      poesessid: this.storage.getValue(STORAGE_KEYS.POESESSID, {defaultValue: ''}),
      account: this.storage.getValue(STORAGE_KEYS.ACCOUNT, {defaultValue: ''})
    });
  }
}
