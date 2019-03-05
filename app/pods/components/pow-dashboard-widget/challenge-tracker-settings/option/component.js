// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type, arrayOf} from '@ember-decorators/argument/type';
import {computed} from '@ember-decorators/object';

export default class extends Component {
  @argument
  @type('object')
  challenge;

  @argument
  @type(arrayOf('string'))
  selectedSlugs;

  @argument
  @type(Function)
  onChallengeSlugToggle;

  @computed('challenge', 'selectedSlugs.[]')
  get isSelected() {
    return this.selectedSlugs.includes(this.challenge.slug);
  }

  click() {
    this.onChallengeSlugToggle(this.challenge.slug);
  }
}
