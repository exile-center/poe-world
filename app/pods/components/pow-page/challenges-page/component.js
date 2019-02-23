// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {task, timeout} from 'ember-concurrency';
import {computed} from '@ember-decorators/object';
import {action} from '@ember-decorators/object';
import {tagName} from '@ember-decorators/component';

// Constants
/* eslint-disable no-magic-numbers */
const POLLING_INTERVAL = 60000; // 60 seconds
const TROPHY_REWARDS = [19, 22, 25, 28, 31, 34, 37, 40];
const MTX_REWARDS = [12, 24, 36];
/* eslint-enable no-magic-numbers */

@tagName('')
export default class PageChallenges extends Component {
  @service('intl')
  intl;

  @service('clock')
  clock;

  @service('leagues/fetcher')
  leaguesFetcher;

  @service('challenges/fetcher')
  challengesFetcher;

  challenges = [];
  selectedChallengeSlug = null;
  league = null;

  @computed('challenges')
  get sortedChallenges() {
    const sortedChallenges = this.challenges.sort((challengeA, challengeB) => {
      if (challengeA.progress !== challengeB.progress) return challengeB.progress - challengeA.progress;

      return challengeB.name.localeCompare(challengeA.name);
    });

    TROPHY_REWARDS.forEach(index => sortedChallenges[index - 1].set('isTrophyRewarded', true));
    MTX_REWARDS.forEach(index => sortedChallenges[index - 1].set('isMtxRewarded', true));

    return sortedChallenges.reverse();
  }

  @computed('league', 'clock.hour')
  get splashMessage() {
    return this.intl.t('components.page.challenges_page.league_remaining', {
      league: this.league.name,
      relativeTime: this.intl.formatRelative(this.league.endAt)
    });
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
    const leagues = yield this.leaguesFetcher.fetch();
    const currentChallengeLeague = leagues.find(league => league.isChallengeLeague && !league.isHardcore);
    if (!currentChallengeLeague) return this.get('challengesPollingTask').cancelAll();

    this.set('league', currentChallengeLeague);
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
