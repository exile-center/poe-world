// Vendor
import Service from '@ember/service';

// Constants
const DIVINATION_CARD_TOP_CATEGORY = 'cards';

export default class Builder extends Service {
  build(stashItems, divinationPricingMap) {
    const divinationStashItemsMap = stashItems.reduce((divinationStashItemsMap, stashItem) => {
      if (stashItem.topCategory !== DIVINATION_CARD_TOP_CATEGORY) return divinationStashItemsMap;

      if (!divinationStashItemsMap[stashItem.slug]) {
        divinationStashItemsMap[stashItem.slug] = {
          cardName: stashItem.name,
          cardMods: stashItem.explicitMods,
          cardSlug: stashItem.slug,
          stackSize: stashItem.maxStackSize,
          quantity: 0
        };
      }

      divinationStashItemsMap[stashItem.slug].quantity += stashItem.quantity;

      return divinationStashItemsMap;
    }, {});

    return Object.values(divinationStashItemsMap)
      .map(stashItem => {
        if (!divinationPricingMap[stashItem.cardSlug]) return null;

        const matchingPricing = divinationPricingMap[stashItem.cardSlug];
        const chaosValue = matchingPricing ? matchingPricing.chaosValue : 0;
        const exaltedValue = matchingPricing ? matchingPricing.exaltedValue : 0;

        return {
          ...stashItem,
          stackCount: Math.floor(stashItem.quantity / stashItem.stackSize),
          chaosValue,
          exaltedValue,
          chaosTotalValue: chaosValue * stashItem.quantity,
          exaltedTotalValue: exaltedValue * stashItem.quantity
        };
      })
      .filter(Boolean)
      .sort((itemA, itemB) => itemB.chaosTotalValue - itemA.chaosTotalValue);
  }
}
