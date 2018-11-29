// Vendor
import {tagName} from '@ember-decorators/component';
import Component from '@ember/component';
import {or} from '@ember-decorators/object/computed';
import {argument} from '@ember-decorators/argument';
import {type} from '@ember-decorators/argument/type';

@tagName('')
export default class TradeMapListItem extends Component {
  @argument
  @type('object')
  tradeMap = null;

  @or('tradeMap.itemQuantity', 'tradeMap.itemRarity', 'tradeMap.monsterPackSize', 'tradeMap.corrupted')
  hasProperties;

  @or('tradeMap.isUnidentified', 'tradeMap.explicitMods')
  hasExplicitMods;
}
