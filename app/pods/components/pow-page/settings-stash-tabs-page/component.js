// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
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

export default class PageSettingsStashTabs extends Component {
  @service('stash/tabs-fetcher')
  stashTabsFetcher;

  stashFeatures = STASH_FEATURES;
  stashes = null;

  stashTabsLoadTask = task(function*() {
    const stashes = yield this.stashTabsFetcher.fetch();
    this.set('stashes', stashes);
  }).drop();

  willInsertElement() {
    this.get('stashTabsLoadTask').perform();
  }
}
