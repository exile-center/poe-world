// Vendor
import EmberObject from '@ember/object';
import {not} from '@ember-decorators/object/computed';

export default class TradeMap extends EmberObject {
  id = null;

  // Map attributes
  rarity = null;

  corrupted = null;
  identified = null;
  verified = null;
  explicitMods = null;
  itemQuantity = null;
  itemRarity = null;
  monsterPackSize = null;

  // Listing information
  indexedAt = null;

  whisper = null;
  account = null;
  priceAmount = null;
  priceCurrencyId = null;
  isAfk = false;

  @not('identified')
  isUnidentified;
}
