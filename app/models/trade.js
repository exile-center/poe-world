// Vendor
import EmberObject from '@ember/object';
import {computed} from '@ember-decorators/object';
import {A} from '@ember/array';

// Constants
import TRADE from 'poe-world/constants/trade';

export default class Trade extends EmberObject {
  id = null;
  label = '';
  notes = '';
  slug = '';
  tags = null;
  updatedAt = null;

  @computed('slug')
  get urlParts() {
    const slugParts = (this.slug || '').split(':');

    return {
      slug: slugParts[0],
      type: slugParts[1] || TRADE.DEFAULT_TYPE
    };
  }

  constructor(props = {}) {
    super(props);

    this.setProperties({
      ...props,
      tags: A(props.tags || [])
    });
  }

  updateProperties(properties) {
    const now = new Date();

    this.setProperties({
      ...properties,
      updatedAt: now.toISOString()
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
