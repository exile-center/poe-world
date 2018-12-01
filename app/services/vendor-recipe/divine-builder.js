// Vendor
import Service from '@ember/service';

// Constants
const SIX_LINK_SOCKET_COUNT = 6;

export default class DivineBuilder extends Service {
  build(stashItems) {
    const itemCount = stashItems.filter(stashItem => {
      if (stashItem.socketGroups.length === 0) return false;
      return stashItem.socketGroups[0].length === SIX_LINK_SOCKET_COUNT;
    }).length;

    return {
      itemCount,
      recipeCount: itemCount
    };
  }
}
