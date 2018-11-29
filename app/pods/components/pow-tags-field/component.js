// Vendor
import {tagName} from '@ember-decorators/component';
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type, optional, unionOf, arrayOf} from '@ember-decorators/argument/type';

// Constants
import KEY_CODES from 'poe-world/constants/key-codes';

// Utilities
import uuid from 'poe-world/utilities/uuid';

@tagName('')
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

  remove(tagToRemove) {
    this.tags.removeObject(tagToRemove);
  }

  newTagInputChange({target: {value}}) {
    this.set('newTag', value);
  }

  newTagInputKeydown({keyCode}) {
    if (![KEY_CODES.TAB, KEY_CODES.ENTER].includes(keyCode)) return true;

    this._confirmNewTag();
    return false;
  }

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
