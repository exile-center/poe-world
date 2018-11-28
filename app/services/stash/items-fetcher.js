// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';
import StashItem from 'poe-world/models/stash-item';

// Utilities
import slugify from 'poe-world/utilities/slugify';

// Global constants
import PRIVATE_API from 'poe-world/constants/private-api';
import FRAME_TYPES from 'poe-world/constants/frame-types';

// Constants
const MAXIMUM_SOCKETS_COUNT = 6;

export default class ItemsFetcher extends Service {
  @service('-electron/request')
  electronRequest;

  @service('authentication/setting')
  authenticationSetting;

  @service('active-league/setting')
  activeLeagueSetting;

  fetchFromStashIndex(stashIndex) {
    const leagueId = this.activeLeagueSetting.league.id;
    const account = this.authenticationSetting.account;

    return this.electronRequest
      .privateFetch(
        `${
          PRIVATE_API.CHARACTER_WINDOW_BASE_URL
        }/get-stash-items?accountName=${account}&league=${leagueId}&tabIndex=${stashIndex}`
      )
      .then(({items: rawStashItems}) => this._buildStashItems(rawStashItems));
  }

  _buildStashItems(rawStashItems) {
    return rawStashItems.map(rawStashItem => {
      const [topCategory, subCategories] = this._getTypesFrom(rawStashItem);
      const name = rawStashItem.typeLine || '';

      return StashItem.create({
        name,
        slug: slugify(name),
        imageUrl: rawStashItem.icon.replace(/\?.+$/, ''),
        itemLevel: rawStashItem.ilvl,
        quantity: rawStashItem.stackSize || 1,
        maxStackSize: rawStashItem.maxStackSize || null,
        topCategory,
        subCategories,
        rarity: FRAME_TYPES[rawStashItem.frameType],
        identified: rawStashItem.identified,
        socketCount: rawStashItem.sockets ? rawStashItem.sockets.length : 0,
        socketGroups: this._getSocketGroupsFor(rawStashItem),
        explicitMods: this._parseMods(rawStashItem.explicitMods)
      });
    });
  }

  _getSocketGroupsFor(rawStashItem) {
    if (!rawStashItem.sockets) return [];

    const allSocketGroups = rawStashItem.sockets.reduce((groups, {group, sColour}) => {
      groups[group] += sColour;
      return groups;
    }, Array(MAXIMUM_SOCKETS_COUNT).fill(''));

    return allSocketGroups.filter(socketGroup => socketGroup.length > 0);
  }

  _getTypesFrom(rawStashItem) {
    const topCategories = Object.keys(rawStashItem.category);
    if (topCategories.length === 0) return [null, []];

    const subCategories = rawStashItem.category[topCategories[0]];
    if (subCategories.length === 0) return [topCategories[0], []];

    return [topCategories[0], subCategories];
  }

  _parseMods(rawMods) {
    if (!rawMods) return [];

    return rawMods.reduce((mods, rawMod) => mods.concat(rawMod.split('\n')), []);
  }
}
