// Vendor
import Component from '@ember/component';
import {equal} from '@ember-decorators/object/computed';
import {argument} from '@ember-decorators/argument';
import {type, optional, unionOf} from '@ember-decorators/argument/type';

// Utilities
import uuid from 'poe-world/utilities/uuid';

// Constants
const TEXTAREA_TYPE = 'textarea';
const DEFAULT_TEXTAREA_ROWS = 5;

export default class InputField extends Component {
  @argument
  @type(optional('string'))
  type = 'text';

  @argument
  @type(optional('number'))
  rows = DEFAULT_TEXTAREA_ROWS;

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
  @type(Function)
  onChange = () => {};

  id = null;

  @equal('type', TEXTAREA_TYPE)
  isTextarea;

  willInsertElement() {
    this.set('id', uuid());
  }

  inputChange({target: {value}}) {
    this.onChange(value);
  }
}
