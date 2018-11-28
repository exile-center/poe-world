// Vendor
import EmberObject from '@ember/object';
import {computed} from '@ember-decorators/object';

export default class League extends EmberObject {
  id = null;
  name = null;

  @computed('id')
  get slug() {
    let slug = this.id.toLowerCase();
    slug = slug.replace(/[^a-z ]/g, '');
    slug = slug.replace(/ /g, '-');

    return slug;
  }
}
