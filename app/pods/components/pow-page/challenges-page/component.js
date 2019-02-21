// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {task, timeout} from 'ember-concurrency';
import {computed} from '@ember-decorators/object';
import {sort, reads} from '@ember-decorators/object/computed';
import {action} from '@ember-decorators/object';
import {tagName} from '@ember-decorators/component';

// Constants
const POLLING_INTERVAL = 60000; // 60 seconds

@tagName('')
export default class PageChallenges extends Component {
  @service('active-league/setting')
  activeLeagueSetting;

  @service('challenges/fetcher')
  challengesFetcher;

  challenges = [];
  selectedChallengeSlug = null;

  @reads('activeLeagueSetting.league')
  league;

  @sort('challenges')
  sortedChallenges(challengeA, challengeB) {
    if (challengeA.progress !== challengeB.progress) return challengeA.progress - challengeB.progress;

    return challengeA.name.localeCompare(challengeB.name);
  }

  @computed('selectedChallengeSlug', 'challenges.@each')
  get selectedChallenge() {
    if (!this.selectedChallengeSlug) return null;

    return this.challenges.find(challenge => challenge.slug === this.selectedChallengeSlug);
  }

  challengesLoadTask = task(function*() {
    const challenges = yield this.challengesFetcher.fetch(this.league.id);

    this.set('challenges', challenges);
  }).drop();

  challengesPollingTask = task(function*() {
    while (true) {
      yield timeout(POLLING_INTERVAL);

      try {
        yield this.get('challengesLoadTask').perform();
      } catch (_error) {
        // Prevent an API glitch from stopping the poll
      }
    }
  }).drop();

  challengesInitialLoadTask = task(function*() {
    yield this.get('challengesLoadTask').perform();
  }).drop();

  willInsertElement() {
    this.get('challengesInitialLoadTask').perform();
    this.get('challengesPollingTask').perform();
  }

  @action
  selectChallenge(slug) {
    this.set('selectedChallengeSlug', slug);
  }
}
