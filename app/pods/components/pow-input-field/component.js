// Vendor
import Component from '@ember/component';
import {equal} from '@ember-decorators/object/computed';

// Utilities
import uuid from 'poe-world/utilities/uuid';

// Constants
const TEXTAREA_TYPE = 'textarea';
const DEFAULT_TEXTAREA_ROWS = 5;

export default class InputField extends Component {
  type = 'text';
  rows = DEFAULT_TEXTAREA_ROWS;
  label = null;
  placeholder = null;
  helper = null;
  value = null;
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
