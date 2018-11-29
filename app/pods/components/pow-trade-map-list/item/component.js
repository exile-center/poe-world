// Vendor
import {classNames, tagName} from '@ember-decorators/component';
import Component from '@ember/component';
import {or} from '@ember-decorators/object/computed';
import {argument} from '@ember-decorators/argument';
import {type} from '@ember-decorators/argument/type';

@classNames('list-group-item')
@tagName('li')
export default class TradeMapListItem extends Component {
  @argument
  @type('object')
  tradeMap = null;

  @or('tradeMap.itemQuantity', 'tradeMap.itemRarity', 'tradeMap.monsterPackSize', 'tradeMap.corrupted')
  hasProperties;

  @or('tradeMap.isUnidentified', 'tradeMap.explicitMods')
  hasExplicitMods;
}
