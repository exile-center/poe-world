// Vendor
import {service} from '@ember-decorators/service';
import {task} from 'ember-concurrency';
import {action} from '@ember-decorators/object';
import {A} from '@ember/array';

// Base widget
import BaseWidgetSettingsComponent from '../base-widget-settings-component';

export default class extends BaseWidgetSettingsComponent {
  @service('challenges/fetcher')
  challengesFetcher;

  challenges = [];
  selectedChallengeSlugs;

  challengesLoadTask = task(function*() {
    const challenges = yield this.challengesFetcher.fetch();
    this.set('challenges', challenges.filter(challenge => Boolean(challenge.subChallenges.length)));
  }).drop();

  willInsertElement() {
    this.get('challengesLoadTask').perform();
    this.set('selectedChallengeSlugs', A(this.settings.challengeSlugs));
  }

  @action
  toggleChallengeSlug(challengeSlug) {
    if (this.selectedChallengeSlugs.includes(challengeSlug)) {
      this.selectedChallengeSlugs.removeObject(challengeSlug);
    } else {
      this.selectedChallengeSlugs.addObject(challengeSlug);
    }

    this.onSettingsUpdate({
      challengeSlugs: this.selectedChallengeSlugs.toArray()
    });
  }
}
