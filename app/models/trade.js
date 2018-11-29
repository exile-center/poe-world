// Vendor
import EmberObject from '@ember/object';
import {A} from '@ember/array';
import moment from 'moment';

export default class Trade extends EmberObject {
  id = null;
  label = '';
  notes = '';
  slug = '';
  tags = null;
  updatedAt = null;

  constructor(props) {
    super(props);
    this.setProperties({
      ...props,
      tags: A(props.tags)
    });
  }

  updateProperties(properties) {
    this.setProperties({
      ...properties,
      updatedAt: moment().toISOString()
    });
  }

  clone(properties) {
    const tradeJson = this.asJson();

    const clone = this.constructor.create({
      ...tradeJson,
      tags: A(tradeJson.tags)
    });

    if (!properties) return clone;

    clone.updateProperties(properties);
    return clone;
  }

  asJson() {
    return {
      ...this.getProperties('id', 'label', 'notes', 'slug', 'updatedAt'),
      tags: this.tags.toArray()
    };
  }
}
