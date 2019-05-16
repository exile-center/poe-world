// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type, optional} from '@ember-decorators/argument/type';
import {action, computed} from '@ember-decorators/object';

export default class extends Component {
  @argument
  @type('object')
  challenge;

  @argument
  @type(optional('string'))
  selectedChallengeSlug;

  @argument
  @type(Function)
  onSelect;

  @computed('challenge.slug', 'selectedChallengeSlug')
  get isSelected() {
    return this.challenge.slug === this.selectedChallengeSlug;
  }

  @action
  select() {
    this.onSelect(this.challenge.slug);
  }
}
