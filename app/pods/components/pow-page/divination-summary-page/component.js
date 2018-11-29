// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {task, timeout} from 'ember-concurrency';

// Mixins
import StashTabsLoadable from 'poe-world/mixins/components/stash-tabs-loadable';

// Constants
const SUMMARY_POLLING_INTERVAL = 300000; // 5 minutes

export default class PageDivinationSummary extends Component.extend(StashTabsLoadable) {
  @service('toaster')
  toaster;

  @service('divination-summary/pricing-fetcher')
  divinationSummaryPricingFetcher;

  @service('divination-summary/setting')
  divinationSummarySetting;

  @service('divination-summary/builder')
  divinationSummaryBuilder;

  hasDivinationSummaryStashes = false;
  divinationSummary = null;

  divinationSummaryLoadTask = task(function*() {
    const stashIds = this.divinationSummarySetting.stashIds;
    const hasDivinationSummaryStashes = stashIds.length > 0;

    const stashItems = yield this.get('loadStashItemsTask').perform(stashIds);
    const divinationPricingMap = yield this.divinationSummaryPricingFetcher.fetch();

    this.setProperties({
      hasDivinationSummaryStashes,
      divinationSummary: this.divinationSummaryBuilder.build(stashItems, divinationPricingMap)
    });
  }).drop();

  divinationSummaryPollingTask = task(function*() {
    while (true) {
      yield timeout(SUMMARY_POLLING_INTERVAL);

      try {
        yield this.get('divinationSummaryLoadTask').perform();
      } catch (_error) {
        // Prevent an API glitch from stopping the poll
      }
    }
  }).drop();

  divinationSummaryInitialLoadTask = task(function*() {
    yield this.get('divinationSummaryLoadTask').perform();
  }).drop();

  willInsertElement() {
    this.get('divinationSummaryInitialLoadTask').perform();
    this.get('divinationSummaryPollingTask').perform();
  }
}
