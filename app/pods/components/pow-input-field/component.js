// Vendors
import Component from '@ember/component';
import {equal} from '@ember/object/computed';

// Utilities
import uuid from 'poe-world/utilities/uuid';

// Constants
const TEXTAREA_TYPE = 'textarea';

export default Component.extend({
  type: 'text',
  rows: 5,
  label: null,
  placeholder: null,
  value: null,
  onChange: () => {},

  id: null,

  isTextarea: equal('type', TEXTAREA_TYPE),

  willInsertElement() {
    this.set('id', uuid());
  },

  inputChange({target: {value}}) {
    this.onChange(value);
  }
});
