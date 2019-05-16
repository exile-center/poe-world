// Vendor
import {service} from '@ember-decorators/service';
import {task} from 'ember-concurrency';
import {action} from '@ember-decorators/object';

// Base widget
import BaseWidgetSettingsComponent from '../base-widget-settings-component';

export default class extends BaseWidgetSettingsComponent {
  @service('challenges/fetcher')
  challengesFetcher;

  challenges = [];

  challengesLoadTask = task(function*() {
    const challenges = yield this.challengesFetcher.fetch();

    this.set(
      'challenges',
      challenges.filter(challenge => {
        if (challenge.completed) return false;
        if (!challenge.subChallenges.length) return false;

        return true;
      })
    );
  }).drop();

  willInsertElement() {
    this.get('challengesLoadTask').perform();
  }

  @action
  selectChallengeSlug(challengeSlug) {
    this.onSettingsUpdate({
      challengeSlug
    });
  }
}
