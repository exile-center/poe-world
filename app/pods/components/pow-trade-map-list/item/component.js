// Vendor
import {classNames, tagName} from '@ember-decorators/component';
import Component from '@ember/component';
import {or} from '@ember-decorators/object/computed';

@classNames('list-group-item')
@tagName('li')
export default class TradeMapListItem extends Component {
  tradeMap = null;

  @or('tradeMap.itemQuantity', 'tradeMap.itemRarity', 'tradeMap.monsterPackSize', 'tradeMap.corrupted')
  hasProperties;

  @or('tradeMap.isUnidentified', 'tradeMap.explicitMods')
  hasExplicitMods;
}
