// Vendor
import EmberObject from '@ember/object';
import {computed} from '@ember-decorators/object';

export default class StashItem extends EmberObject {
  name = null;
  slug = null;
  imageUrl = null;
  itemLevel = null;
  topCategory = null;
  subCategories = null;
  rarity = null;
  identified = null;
  socketCount = null;
  socketGroups = null;
  quantity = null;
  maxStackSize = null;
  explicitMods = null;

  constructor(props) {
    super(props);
    this.setProperties(props);
  }

  @computed('subCategories')
  get defaultCategory() {
    if (this.subCategories.length > 0) return this.subCategories[0];
    return null;
  }
}
