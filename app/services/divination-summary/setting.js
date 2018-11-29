// Vendor
import STORAGE_KEYS from 'poe-world/constants/storage-keys';
import BaseStashSetting from 'poe-world/services/base-stash-setting';

export default class Setting extends BaseStashSetting {
  get storageKey() {
    return STORAGE_KEYS.DIVINATION_SUMMARY_STASH_IDS;
  }
}
