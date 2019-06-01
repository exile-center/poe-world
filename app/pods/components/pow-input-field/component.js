// Vendor
import Component from '@ember/component';
import {equal} from '@ember-decorators/object/computed';
import {argument} from '@ember-decorators/argument';
import {type, optional, unionOf} from '@ember-decorators/argument/type';
import {action} from '@ember-decorators/object';

// Utilities
import uuid from 'poe-world/utilities/uuid';

// Global constants
import KEY_CODES from 'poe-world/constants/key-codes';

// Constants
const TEXTAREA_TYPE = 'textarea';
const DEFAULT_TEXTAREA_ROWS = 5;

export default class InputField extends Component {
  @argument
  @type(optional('string'))
  type = 'text';

  @argument
  @type(optional(unionOf('string', 'object')))
  label = null;

  @argument
  @type(optional(unionOf('string', 'object')))
  placeholder = null;

  @argument
  @type(optional(unionOf('string', 'object')))
  helper = null;

  @argument
  @type(optional('string'))
  value = null;

  @argument
  @type(optional('number'))
  rows = DEFAULT_TEXTAREA_ROWS;

  @argument
  @type(Function)
  onChange;

  @argument
  @type(optional(Function))
  onFocus;

  @argument
  @type(optional(Function))
  onBlur;

  @argument
  @type(optional(Function))
  onEscape;

  id = null;

  @equal('type', TEXTAREA_TYPE)
  isTextarea;

  willInsertElement() {
    this.set('id', uuid());
  }

  @action
  inputChange({target: {value}}) {
    this.onChange(value);
  }

  @action
  inputKeyUp({keyCode}) {
    if (KEY_CODES.ESCAPE !== keyCode || !this.onEscape) return;

    this.onEscape(this.value);
  }

  @action
  inputFocus() {
    if (!this.onFocus) return;

    this.onFocus();
  }

  @action
  inputBlur() {
    if (!this.onBlur) return;

    this.onBlur();
  }
}
