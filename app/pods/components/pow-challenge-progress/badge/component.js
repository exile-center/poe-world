// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type} from '@ember-decorators/argument/type';
import {computed} from '@ember-decorators/object';
import {reads} from '@ember-decorators/object/computed';

export default class ChallengeProgressBadge extends Component {
  @argument
  @type('object')
  challenge = null;

  @computed('challenge')
  get hasProgression() {
    return this.challenge.treshold > 1 || this.challenge.subChallenges.length;
  }

  @reads('challenge.completed')
  isCompleted;
}
