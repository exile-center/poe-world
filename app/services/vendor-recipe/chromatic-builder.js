import Service from '@ember/service';

export default Service.extend({
  initializeDataStructure() {
    return {
      itemCount: 0,
      recipeCount: 0
    };
  },

  build(stashItems) {
    const dataStructure = this.initializeDataStructure();

    stashItems.forEach((stashItem) => {
      const hasChromaticGroup = stashItem.socketGroups.some((socketGroup) => {
        if (socketGroup.indexOf('R') === -1) return false;
        if (socketGroup.indexOf('G') === -1) return false;
        if (socketGroup.indexOf('B') === -1) return false;

        return true;
      });

      if (hasChromaticGroup) dataStructure.itemCount++;
    });

    dataStructure.recipeCount = dataStructure.itemCount;

    return dataStructure;
  }
});
