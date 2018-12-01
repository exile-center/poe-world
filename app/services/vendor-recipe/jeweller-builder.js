// Vendor
import Service from '@ember/service';

// Constants
const JEWELLER_SOCKETS_COUNT = 6;
const JEWELLER_RECIPE_RATIO = 7;

export default class JewellerBuilder extends Service {
  build(stashItems) {
    const itemCount = stashItems.filter(stashItem => stashItem.socketCount === JEWELLER_SOCKETS_COUNT).length;

    return {
      itemCount,
      recipeCount: itemCount * JEWELLER_RECIPE_RATIO
    };
  }
}
