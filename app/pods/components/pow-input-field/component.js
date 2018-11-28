// Vendor
import Component from '@ember/component';
import {equal} from '@ember-decorators/object/computed';

// Utilities
import uuid from 'poe-world/utilities/uuid';

// Constants
const TEXTAREA_TYPE = 'textarea';

export default class Component extends Component {
  type = 'text';
  rows = 5;
  label = null;
  placeholder = null;
  helper = null;
  value = null;
  onChange = () => {};
  id = null;

  @equal('type')
  isTextarea;

  willInsertElement() {
    this.set('id', uuid());
  }

  inputChange({target: {value}}) {
    this.onChange(value);
  }
}
