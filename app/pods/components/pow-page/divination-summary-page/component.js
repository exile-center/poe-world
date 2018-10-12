// Vendors
import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {task, timeout} from 'ember-concurrency';

// Mixins
import StashTabsLoadable from 'poe-world/mixins/components/stash-tabs-loadable';

// Constants
const SUMMARY_POLLING_INTERVAL = 300000; // 5 minutes

export default Component.extend(StashTabsLoadable, {
  toaster: service('toaster'),
  divinationSummaryPricingFetcher: service('divination-summary/pricing-fetcher'),
  divinationSummarySetting: service('divination-summary/setting'),
  divinationSummaryBuilder: service('divination-summary/builder'),

  hasDivinationSummaryStashes: false,

  divinationSummary: null,

  divinationSummaryLoadTask: task(function *() {
    const stashIds = this.divinationSummarySetting.stashIds;
    const hasDivinationSummaryStashes = stashIds.length > 0;

    const stashItems = yield this.loadStashItemsTask.perform(stashIds);
    const divinationPricingMap = yield this.divinationSummaryPricingFetcher.fetch();

    this.setProperties({
      hasDivinationSummaryStashes,
      divinationSummary: this.divinationSummaryBuilder.build(stashItems, divinationPricingMap)
    });
  }).drop(),

  divinationSummaryPollingTask: task(function *() {
    while (true) {
      yield timeout(SUMMARY_POLLING_INTERVAL);

      try {
        yield this.divinationSummaryLoadTask.perform();
      } catch (_error) {
        // Prevent an API glitch from stopping the poll
      }
    }
  }).drop(),

  divinationSummaryInitialLoadTask: task(function *() {
    yield this.divinationSummaryLoadTask.perform();
  }).drop(),

  willInsertElement() {
    this.divinationSummaryInitialLoadTask.perform();
    this.divinationSummaryPollingTask.perform();
  }
});
