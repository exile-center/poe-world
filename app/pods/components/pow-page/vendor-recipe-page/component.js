// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {task, timeout} from 'ember-concurrency';

// Mixins
import StashTabsLoadable from 'poe-world/mixins/components/stash-tabs-loadable';

// Global constants
import CURRENCIES from 'poe-world/constants/currencies';

// Constants
const RECIPE_POLLING_INTERVAL = 60000; // 60 seconds

export default class PageVendorRecipe extends Component.extend(StashTabsLoadable) {
  @service('toaster')
  toaster;

  @service('stash/tabs-fetcher')
  stashTabsFetcher;

  @service('stash/items-fetcher')
  stashItemsFetcher;

  @service('vendor-recipe/setting')
  vendorRecipeSetting;

  @service('vendor-recipe/chromatic-builder')
  vendorRecipeChromaticBuilder;

  @service('vendor-recipe/jeweller-builder')
  vendorRecipeJewellerBuilder;

  @service('vendor-recipe/divine-builder')
  vendorRecipeDivineBuilder;

  @service('vendor-recipe/chaos-builder')
  vendorRecipeChaosBuilder;

  hasVendorRecipeStashes = false;
  chromaticImageUrl = CURRENCIES.chrom.imageUrl;
  jewellerImageUrl = CURRENCIES.jew.imageUrl;
  divineImageUrl = CURRENCIES.divine.imageUrl;
  chaosImageUrl = CURRENCIES.chaos.imageUrl;
  regalImageUrl = CURRENCIES.regal.imageUrl;
  chromatic = null;
  jeweller = null;
  divine = null;
  chaos = null;

  vendorRecipeLoadTask = task(function*() {
    const stashIds = this.vendorRecipeSetting.stashIds;
    const hasVendorRecipeStashes = stashIds.length > 0;

    const stashItems = yield this.get('loadStashItemsTask').perform(stashIds);

    this.setProperties({
      hasVendorRecipeStashes,
      chromatic: this.vendorRecipeChromaticBuilder.build(stashItems),
      jeweller: this.vendorRecipeJewellerBuilder.build(stashItems),
      divine: this.vendorRecipeDivineBuilder.build(stashItems),
      chaos: this.vendorRecipeChaosBuilder.build(stashItems)
    });
  }).drop();

  vendorRecipePollingTask = task(function*() {
    while (true) {
      yield timeout(RECIPE_POLLING_INTERVAL);

      try {
        yield this.get('vendorRecipeLoadTask').perform();
      } catch (_error) {
        // Prevent an API glitch from stopping the poll
      }
    }
  }).drop();

  vendorRecipeInitialLoadTask = task(function*() {
    yield this.get('vendorRecipeLoadTask').perform();
  }).drop();

  willInsertElement() {
    this.get('vendorRecipeInitialLoadTask').perform();
    this.get('vendorRecipePollingTask').perform();
  }
}
