// Vendor
import {tagName} from '@ember-decorators/component';
import Component from '@ember/component';
import {computed} from '@ember-decorators/object';

// Constants
const RARITY_REGEX = /\<(\w+)\>\{(.+)\}/; // <uniqueitem>{Sire of Shards}

@tagName('')
export default class Component extends Component {
  mod = '';

  @computed('mod')
  get name() {
    if (!RARITY_REGEX.test(this.mod)) return this.mod;

    let name = this.mod.match(RARITY_REGEX)[2];
    name = name.replace(/\<[^\<\>]+\>/g, '');
    name = name.replace(/[\{\}]/g, '');

    return name;
  }

  @computed('mod')
  get rarity() {
    if (!RARITY_REGEX.test(this.mod)) return null;

    return this.mod.match(RARITY_REGEX)[1];
  }
}
