// Vendor
import EmberObject from '@ember/object';

export default class Pricing extends EmberObject {
  name = null;
  chaosValue = null;
  exaltedValue = null;

  constructor(props) {
    super(props);
    this.setProperties(props);
  }
}
