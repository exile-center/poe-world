// Vendor
import Service from '@ember/service';

// Constants
const JEWELLER_SOCKETS_COUNT = 6;
const JEWELLER_RECIPE_RATIO = 7;

export default class JewellerBuilder extends Service {
  initializeDataStructure() {
    return {
      itemCount: 0,
      recipeCount: 0
    };
  }

  build(stashItems) {
    const dataStructure = this.initializeDataStructure();

    stashItems.forEach(stashItem => {
      if (stashItem.socketCount === JEWELLER_SOCKETS_COUNT) dataStructure.itemCount++;
    });

    dataStructure.recipeCount = dataStructure.itemCount * JEWELLER_RECIPE_RATIO;

    return dataStructure;
  }
}
