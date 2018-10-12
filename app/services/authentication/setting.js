import Service, {inject as service} from '@ember/service';
import STORAGE_KEYS from 'poe-world/constants/storage-keys';

export default Service.extend({
  storage: service('storage'),

  poesessid: null,
  account: null,

  applyAccount(account) {
    this.set('account', account);
    this.storage.setValue(STORAGE_KEYS.ACCOUNT, account);
  },

  applyPoesessid(poesessid) {
    this.set('poesessid', poesessid);
    this.storage.setValue(STORAGE_KEYS.POESESSID, poesessid);
  },

  init() {
    this._super(...arguments);

    this.setProperties({
      poesessid: this.storage.getValue(STORAGE_KEYS.POESESSID, {defaultValue: ''}),
      account: this.storage.getValue(STORAGE_KEYS.ACCOUNT, {defaultValue: ''})
    });
  }
});
