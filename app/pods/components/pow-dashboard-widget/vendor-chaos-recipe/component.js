// Vendor
import {service} from '@ember-decorators/service';
import {task, timeout} from 'ember-concurrency';

// Base widget
import BaseWidgetComponent from '../base-widget-component';

// Constants
const RECIPE_POLLING_INTERVAL = 60000; // 60 seconds
const ITEMS_TO_DISPLAY = 3;

export default class extends BaseWidgetComponent {
  @service('vendor-recipe/setting')
  vendorRecipeSetting;

  @service('vendor-recipe/chaos-builder')
  vendorRecipeChaosBuilder;

  @service('stash/items-fetcher')
  stashItemsFetcher;

  chaosRecipeSlots = [];
  isRateLimited = false;

  vendorRecipeLoadTask = task(function*() {
    const stashIds = this.vendorRecipeSetting.stashIds;

    const stashItems = yield this.stashItemsFetcher.fetchFromStashIds(stashIds);
    const chaosRecipes = this.vendorRecipeChaosBuilder.build(stashItems);

    this.set('chaosRecipeSlots', this._extractCriticalSlotsFrom(chaosRecipes));
  }).drop();

  vendorRecipePollingTask = task(function*() {
    while (true) {
      try {
        yield this.get('vendorRecipeLoadTask').perform();
        this.set('isRateLimited', false);
      } catch (_error) {
        this.set('isRateLimited', true);
      }

      yield timeout(RECIPE_POLLING_INTERVAL);
    }
  }).drop();

  willInsertElement() {
    this.onSetupLoadTask(this.get('vendorRecipeLoadTask'));
    this.get('vendorRecipePollingTask').perform();
  }

  _extractCriticalSlotsFrom(chaosRecipes) {
    return Object.values(chaosRecipes)
      .sort((chaosRecipeA, chaosRecipeB) => chaosRecipeA.recipeCount - chaosRecipeB.recipeCount)
      .filter(({isDanger, isWarning}) => isDanger || isWarning)
      .slice(0, ITEMS_TO_DISPLAY);
  }
}
