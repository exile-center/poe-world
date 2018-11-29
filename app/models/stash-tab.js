// Vendor
import EmberObject from '@ember/object';

export default class StashTab extends EmberObject {
  id = null;
  name = null;
  type = null;
  index = null;
  color = null;

  constructor(props) {
    super(props);
    this.setProperties(props);
  }
}
