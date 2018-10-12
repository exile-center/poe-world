// Vendors
import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {task, timeout} from 'ember-concurrency';

// Mixins
import StashTabsLoadable from 'poe-world/mixins/components/stash-tabs-loadable';

// Global constants
import CURRENCIES from 'poe-world/constants/currencies';

// Constants
const RECIPE_POLLING_INTERVAL = 60000; // 60 seconds

export default Component.extend(StashTabsLoadable, {
  toaster: service('toaster'),
  stashTabsFetcher: service('stash/tabs-fetcher'),
  stashItemsFetcher: service('stash/items-fetcher'),
  vendorRecipeSetting: service('vendor-recipe/setting'),

  vendorRecipeChromaticBuilder: service('vendor-recipe/chromatic-builder'),
  vendorRecipeJewellerBuilder: service('vendor-recipe/jeweller-builder'),
  vendorRecipeDivineBuilder: service('vendor-recipe/divine-builder'),
  vendorRecipeChaosBuilder: service('vendor-recipe/chaos-builder'),

  hasVendorRecipeStashes: false,

  chromaticImageUrl: CURRENCIES.chrom.imageUrl,
  jewellerImageUrl: CURRENCIES.jew.imageUrl,
  divineImageUrl: CURRENCIES.divine.imageUrl,
  chaosImageUrl: CURRENCIES.chaos.imageUrl,
  regalImageUrl: CURRENCIES.regal.imageUrl,

  chromatic: null,
  jeweller: null,
  divine: null,
  chaos: null,

  vendorRecipeLoadTask: task(function *() {
    const stashIds = this.vendorRecipeSetting.stashIds;
    const hasVendorRecipeStashes = stashIds.length > 0;

    const stashItems = yield this.loadStashItemsTask.perform(stashIds);

    this.setProperties({
      hasVendorRecipeStashes,
      chromatic: this.vendorRecipeChromaticBuilder.build(stashItems),
      jeweller: this.vendorRecipeJewellerBuilder.build(stashItems),
      divine: this.vendorRecipeDivineBuilder.build(stashItems),
      chaos: this.vendorRecipeChaosBuilder.build(stashItems)
    });
  }).drop(),

  vendorRecipePollingTask: task(function *() {
    while (true) {
      yield timeout(RECIPE_POLLING_INTERVAL);

      try {
        yield this.vendorRecipeLoadTask.perform();
      } catch (_error) {
        // Prevent an API glitch from stopping the poll
      }
    }
  }).drop(),

  vendorRecipeInitialLoadTask: task(function *() {
    yield this.vendorRecipeLoadTask.perform();
  }).drop(),

  willInsertElement() {
    this.vendorRecipeInitialLoadTask.perform();
    this.vendorRecipePollingTask.perform();
  }
});
