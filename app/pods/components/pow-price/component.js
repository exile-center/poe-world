// Vendor
import {tagName} from '@ember-decorators/component';
import Component from '@ember/component';
import {computed} from '@ember-decorators/object';
import CURRENCIES from 'poe-world/constants/currencies';

@tagName('')
export default class Component extends Component {
  amount = null;
  currencyId = null;

  @computed('amount')
  get roundedAmount() {
    return Math.floor(this.amount * 100) / 100;
  }

  @computed('currencyId')
  get currency() {
    if (!CURRENCIES[this.currencyId]) return null;

    return CURRENCIES[this.currencyId];
  }
}
