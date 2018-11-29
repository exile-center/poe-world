// Vendor
import Component from '@ember/component';
import {computed} from '@ember-decorators/object';
import {getOwner} from '@ember/application';
import toggleArray from 'poe-world/utilities/toggle-array';
import {argument} from '@ember-decorators/argument';
import {type} from '@ember-decorators/argument/type';

export default class StashSetting extends Component {
  @argument
  @type('object')
  stash = null;

  @argument
  @type('object')
  stashFeature = null;

  isIncluded = false;

  @computed('stash.type')
  get isSupported() {
    return this.stashFeature.supportedTypes.includes(this.stash.type);
  }

  willInsertElement() {
    const settingService = this._lookupSettingServiceFor(this.stashFeature);
    if (!settingService || !settingService.stashIds) return this.set('isIncluded', false);

    this.set('isIncluded', settingService.stashIds.includes(this.stash.id));
  }

  toggleStash(stash) {
    const settingService = this._lookupSettingServiceFor(this.stashFeature);
    if (!settingService || !settingService.applyStashIds) return;

    settingService.applyStashIds(toggleArray(settingService.stashIds, stash.id));
    this.toggleProperty('isIncluded');
  }

  _lookupSettingServiceFor(stashFeature) {
    return getOwner(this).lookup(`service:${stashFeature.settingService}`);
  }
}
