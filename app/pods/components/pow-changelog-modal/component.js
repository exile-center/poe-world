// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {dropTask} from 'ember-concurrency-decorators';
import {timeout} from 'ember-concurrency';
import ENV from 'poe-world/config/environment';
import STORAGE_KEYS from 'poe-world/constants/storage-keys';

// Constants
const {
  APP: {VERSION: CURRENT_VERSION, CHANGELOG, FORCE_CHANGELOG}
} = ENV;
const CHANGELOG_MODAL_DELAY = 1500;

export default class Component extends Component {
  @service('storage')
  storage;

  changelogMarkdown = null;
  isOpened = false;

  @dropTask
  verifyVersionsTask = function*() {
    const lastSessionVersion = this.storage.getValue(STORAGE_KEYS.LAST_SESSION_VERSION, {defaultValue: '0.0.0'});

    if (!CHANGELOG) return;
    if (lastSessionVersion >= CURRENT_VERSION && !FORCE_CHANGELOG) return;

    yield timeout(CHANGELOG_MODAL_DELAY);

    return this.setProperties({
      changelogMarkdown: CHANGELOG,
      isOpened: true
    });
  };

  onClose() {
    this.storage.setValue(STORAGE_KEYS.LAST_SESSION_VERSION, CURRENT_VERSION);

    this.set('isOpened', false);
  }

  willInsertElement() {
    this.verifyVersionsTask.perform();
  }
}
