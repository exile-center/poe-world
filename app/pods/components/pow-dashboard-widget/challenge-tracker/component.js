// Vendor
import {service} from '@ember-decorators/service';
import {task, timeout} from 'ember-concurrency';

// Base widget
import BaseWidgetComponent from '../base-widget-component';

// Constants
const CHALLENGES_POLLING_INTERVAL = 60000; // 60 seconds

export default class extends BaseWidgetComponent {
  @service('challenges/fetcher')
  challengesFetcher;

  challenges = [];
  trackedChallenge = null;

  challengesLoadTask = task(function*() {
    const challenges = yield this.challengesFetcher.fetch();

    this.set('trackedChallenge', challenges.find(challenge => challenge.slug === this.settings.challengeSlug));
  }).drop();

  challengesPollingTask = task(function*() {
    while (true) {
      try {
        yield this.get('challengesLoadTask').perform();
      } catch (_error) {
        // Prevent a glitch from stopping the poll
      }

      yield timeout(CHALLENGES_POLLING_INTERVAL);
    }
  }).drop();

  willInsertElement() {
    this.onSetupLoadTask(this.get('challengesLoadTask'));
    this.get('challengesPollingTask').perform();
  }

  didUpdateAttrs() {
    this.challengesLoadTask.perform();
  }
}
