import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency';
import ENV from 'poe-world/config/environment';
import STORAGE_KEYS from 'poe-world/constants/storage-keys';

// Constants
const {APP: {VERSION: CURRENT_VERSION, CHANGELOG, FORCE_CHANGELOG}} = ENV;

export default Component.extend({
  storage: service('storage'),
  releasesFetcher: service('fetchers/releases-fetcher'),

  changelogMarkdown: null,
  isOpened: false,
  nextRelease: null,

  verifyVersionsTask: task(function *() {
    const lastSessionVersion = this.storage.getValue(STORAGE_KEYS.LAST_SESSION_VERSION, '0.0.0');

    if (lastSessionVersion < CURRENT_VERSION || FORCE_CHANGELOG) {
      return this.setProperties({
        changelogMarkdown: CHANGELOG,
        isOpened: true
      });
    }

    const latestRelease = yield this.releasesFetcher.fetchLatest();

    if (latestRelease.version > CURRENT_VERSION) {
      return this.setProperties({
        changelogMarkdown: latestRelease.changelog,
        nextRelease: latestRelease,
        isOpened: true
      });
    }
  }).drop(),

  onClose() {
    this.storage.setValue(STORAGE_KEYS.LAST_SESSION_VERSION, CURRENT_VERSION);

    this.set('isOpened', false);
  },

  willInsertElement() {
    this.verifyVersionsTask.perform();
  }
});
