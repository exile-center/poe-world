// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';
import $ from 'jquery';

// Models
import Challenge from 'poe-world/models/challenge';

// Constants
import PRIVATE_API from 'poe-world/constants/private-api';

export default class Fetcher extends Service {
  @service('-electron/request')
  electronRequest;

  @service('authentication/setting')
  authenticationSetting;

  @service('active-league/setting')
  activeLeagueSetting;

  fetch() {
    const leagueId = this.activeLeagueSetting.league.id;
    const account = this.authenticationSetting.account;

    return this.electronRequest
      .privateFetch(`${PRIVATE_API.PROFILE_BASE_URL}/${account}/challenges/${leagueId}`)
      .then(challengesHtml => {
        return $(challengesHtml)
          .find('.achievement-list > .achievement')
          .map((_, challengeNode) => {
            return this._parseChallenge(challengeNode);
          })
          .toArray();
      });
  }

  _parseChallenge(challengeNode) {
    const $challenge = $(challengeNode);

    const completionValue = $challenge
      .find('h2.completion-detail')
      .text()
      .trim();

    const [completion, treshold] = this._parseCompletionFrom(completionValue);
    const name = $challenge
      .find('h2:first')
      .text()
      .trim();
    const description = $challenge
      .find('.detail > span.text')
      .text()
      .trim();

    return Challenge.create({
      name,
      description,
      completed: !$challenge.hasClass('incomplete'),
      subChallenges: this._parseSubChallenges($challenge.find('span.items > ul > li')),
      completion: completion || 0,
      treshold: treshold || 1
    });
  }

  _parseSubChallenges(subChallengeNodes) {
    if (!subChallengeNodes) return [];

    return subChallengeNodes
      .map((_, subChallenge) => {
        const $subChallenge = $(subChallenge);
        const fullDescription = $subChallenge.text().trim();
        const [completion, treshold] = this._parseCompletionFrom(fullDescription);

        return Challenge.create({
          name: null,
          description: fullDescription.replace(/ \(\d+\/\d+\)/, ''),
          completed: $subChallenge.hasClass('finished'),
          subChallenges: [],
          completion: completion || 0,
          treshold: treshold || 1
        });
      })
      .toArray();
  }

  _parseCompletionFrom(textValue) {
    const completionMatch = textValue.match(/(\d+)\/(\d+)/);
    if (!completionMatch) return [null, null];

    return [parseInt(completionMatch[1], 10), parseInt(completionMatch[2], 10)];
  }
}
