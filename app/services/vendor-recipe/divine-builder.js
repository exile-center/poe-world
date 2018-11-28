// Vendor
import Service from '@ember/service';

// Constants
const SIX_LINK_SOCKET_COUNT = 6;

export default class DivineBuilder extends Service {
  initializeDataStructure() {
    return {
      itemCount: 0,
      recipeCount: 0
    };
  }

  build(stashItems) {
    const dataStructure = this.initializeDataStructure();

    stashItems.forEach(stashItem => {
      if (stashItem.socketGroups.length === 0 || stashItem.socketGroups[0].length < SIX_LINK_SOCKET_COUNT) return;

      dataStructure.itemCount++;
    });

    dataStructure.recipeCount = dataStructure.itemCount;

    return dataStructure;
  }
}
