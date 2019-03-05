// Vendor
import {service} from '@ember-decorators/service';
import {computed} from '@ember-decorators/object';
import {task, timeout} from 'ember-concurrency';

// Base widget
import BaseWidgetComponent from '../base-widget-component';

// Constants
const CHALLENGES_POLLING_INTERVAL = 60000; // 60 seconds

export default class extends BaseWidgetComponent {
  @service('challenges/fetcher')
  challengesFetcher;

  challenges = [];

  @computed('challenges', 'settings.challengeSlugs')
  get filteredChallenges() {
    const challengeSlugs = this.settings.challengeSlugs;
    return this.challenges.filter(challenge => {
      return challengeSlugs.includes(challenge.slug) && !challenge.completed;
    });
  }

  challengesLoadTask = task(function*() {
    const challenges = yield this.challengesFetcher.fetch();
    this.set('challenges', challenges);
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
}
