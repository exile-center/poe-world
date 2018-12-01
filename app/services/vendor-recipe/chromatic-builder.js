// Vendor
import Service from '@ember/service';

// Constants
const SIX_LINK_SOCKET_COUNT = 6;

export default class ChromaticBuilder extends Service {
  build(stashItems) {
    const itemCount = stashItems.filter(stashItem => {
      return stashItem.socketGroups.some(socketGroup => {
        if (!socketGroup.includes('R')) return false;
        if (!socketGroup.includes('G')) return false;
        if (!socketGroup.includes('B')) return false;
        if (socketGroup.length === SIX_LINK_SOCKET_COUNT) return false;

        return true;
      });
    }).length;

    return {
      itemCount,
      recipeCount: itemCount
    };
  }
}
