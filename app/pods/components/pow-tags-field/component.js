// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type, optional, unionOf, arrayOf} from '@ember-decorators/argument/type';
import {action} from '@ember-decorators/object';

// Constants
import KEY_CODES from 'poe-world/constants/key-codes';

// Utilities
import uuid from 'poe-world/utilities/uuid';

export default class TagsField extends Component {
  @argument
  @type(optional(unionOf('string', 'object')))
  label = null;

  @argument
  @type(optional(unionOf('string', 'object')))
  placeholder = null;

  @argument
  @type(arrayOf('string'))
  tags = null;

  newTag = '';

  willInsertElement() {
    this.set('id', uuid());
  }

  @action
  remove(tagToRemove) {
    this.tags.removeObject(tagToRemove);
  }

  @action
  newTagInputChange({target: {value}}) {
    this.set('newTag', value);
  }

  @action
  newTagInputKeydown({keyCode}) {
    if (![KEY_CODES.ENTER].includes(keyCode)) return true;

    this._confirmNewTag();
    return false;
  }

  @action
  newTagInputBlur() {
    this._confirmNewTag();
  }

  _confirmNewTag() {
    if (!this.newTag) return false;

    this.tags.pushObject(this.newTag);
    this.set('newTag', '');

    return true;
  }
}
