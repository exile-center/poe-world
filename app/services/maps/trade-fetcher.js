// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';
import TradeMap from 'poe-world/models/trade-map';
import TRADE_API from 'poe-world/constants/trade-api';
import FRAME_TYPES from 'poe-world/constants/frame-types';

// Constants
const AFK_STATUS = 'afk';
const NORMAL_QUERY = {
  query: {
    status: {
      option: 'online'
    },
    type: {
      option: '__MAP_NAME__',
      discriminator: TRADE_API.VERSION_DISCRIMINATOR
    }
  },
  sort: {
    price: 'asc'
  }
};

const UNIQUE_QUERY = {
  query: {
    status: {
      option: 'online'
    },
    name: {
      option: '__MAP_NAME__',
      discriminator: TRADE_API.VERSION_DISCRIMINATOR
    }
  },
  sort: {
    price: 'asc'
  }
};

export default class TradeFetcher extends Service {
  @service('request')
  request;

  @service('active-league/setting')
  activeLeagueSetting;

  fetchFromMap(map) {
    const leagueId = this.activeLeagueSetting.league.id;

    return this.request
      .fetch(`${TRADE_API.BASE_URL}/search/${leagueId}?source=${this._queryParamFor(map)}`)
      .then(({result: tradeMapIds, total}) => {
        if (!tradeMapIds.length) return {maps: [], tradeMapIds: [], total};

        const tradeMapIdsParam = tradeMapIds.splice(0, TRADE_API.BATCH_SIZE).join(',');

        return this.request.fetch(`${TRADE_API.BASE_URL}/fetch/${tradeMapIdsParam}`).then(({result: mapResults}) => ({
          tradeMaps: this._buildMaps(mapResults),
          tradeMapIds,
          total
        }));
      });
  }

  fetchFromIds(tradeMapIds) {
    const tradeMapIdsParam = tradeMapIds.splice(0, TRADE_API.BATCH_SIZE).join(',');

    return this.request.fetch(`${TRADE_API.BASE_URL}/fetch/${tradeMapIdsParam}`).then(({result: mapResults}) => ({
      tradeMaps: this._buildMaps(mapResults),
      tradeMapIds
    }));
  }

  _queryParamFor(map) {
    const {isUnique, tradeName} = map;

    if (isUnique) return JSON.stringify(UNIQUE_QUERY).replace('__MAP_NAME__', tradeName);
    return JSON.stringify(NORMAL_QUERY).replace('__MAP_NAME__', tradeName);
  }

  /* eslint-disable complexity */
  _buildMaps(mapResults) {
    return mapResults.map(mapResult => {
      const iiqProperty = mapResult.item.properties.find(({name}) => /quantity/i.test(name));
      const iirProperty = mapResult.item.properties.find(({name}) => /rarity/i.test(name));
      const mpsProperty = mapResult.item.properties.find(({name}) => /monster/i.test(name));

      return TradeMap.create({
        id: mapResult.id,
        rarity: FRAME_TYPES[mapResult.item.frameType],
        corrupted: mapResult.item.corrupted || false,
        identified: mapResult.item.identified || false,
        verified: mapResult.item.verified || false,
        explicitMods: mapResult.item.explicitMods,
        itemQuantity: iiqProperty ? iiqProperty.values[0][0] : null,
        itemRarity: iirProperty ? iirProperty.values[0][0] : null,
        monsterPackSize: mpsProperty ? mpsProperty.values[0][0] : null,
        indexedAt: mapResult.listing.indexed,
        whisper: mapResult.listing.whisper,
        account: mapResult.listing.account.name,
        priceAmount: mapResult.listing.price ? mapResult.listing.price.amount : null,
        priceCurrencyId: mapResult.listing.price ? mapResult.listing.price.currency : null,
        isAfk: mapResult.listing.account.online.status === AFK_STATUS
      });
    });
  }
  /* eslint-enable complexity */
}
