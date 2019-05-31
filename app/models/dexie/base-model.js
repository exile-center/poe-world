// Vendor
import EmberObject from '@ember/object';

export default class BaseModel extends EmberObject {
  id;
  serializableFields = [];

  constructor(properties) {
    super(properties);
    this.setProperties(properties);
  }

  asJson() {
    const payload = this.getProperties(...this.serializableFields);
    if (!!this.id) payload.id = this.id;

    return payload;
  }
}
