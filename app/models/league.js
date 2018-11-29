// Vendor
import EmberObject from '@ember/object';
import {computed} from '@ember-decorators/object';

export default class League extends EmberObject {
  id = null;
  name = null;

  constructor(props) {
    super(props);
    this.setProperties(props);
  }

  @computed('id')
  get slug() {
    if (!this.id) return '';

    let slug = this.id.toLowerCase();
    slug = slug.replace(/[^a-z ]/g, '');
    slug = slug.replace(/ /g, '-');

    return slug;
  }
}
