// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type} from '@ember-decorators/argument/type';

export default class ChallengeDetails extends Component {
  @argument
  @type('object')
  challenge;

  @argument
  @type('object')
  league;

  oldChallengeSlug = null;

  didUpdateAttrs() {
    if (this.oldChallengeSlug === this.challenge.slug) return;

    this.$().scrollTop(0);
  }

  didReceiveAttrs() {
    this.set('oldChallengeSlug', this.challenge.slug);
  }
}
