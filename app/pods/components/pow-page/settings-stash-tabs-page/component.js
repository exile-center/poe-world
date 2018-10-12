import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency';

// Constants
const STASH_FEATURES = [
  // Vendor recipes
  {
    titleKey: 'components.page.settings_stash_tabs_page.vendor_recipe',
    settingService: 'vendor-recipe/setting',
    supportedTypes: ['Premium', 'Normal', 'Quad']
  },
  // Divination summary
  {
    titleKey: 'components.page.settings_stash_tabs_page.divination_summary',
    settingService: 'divination-summary/setting',
    supportedTypes: ['Premium', 'Normal', 'Quad', 'DivinationCard']
  }
];

export default Component.extend({
  stashTabsFetcher: service('stash/tabs-fetcher'),

  stashFeatures: STASH_FEATURES,

  stashes: [],

  stashTabsLoadTask: task(function *() {
    const stashes = yield this.stashTabsFetcher.fetch();
    this.set('stashes', stashes);
  }).drop(),

  willInsertElement() {
    this.stashTabsLoadTask.perform();
  }
});
