// Vendor
import EmberObject from '@ember/object';
import {computed} from '@ember-decorators/object';
import {reads} from '@ember-decorators/object/computed';

export default class League extends EmberObject {
  id = null;
  url = null;
  startAt = null;
  endAt = null;

  constructor(props) {
    super(props);
    this.setProperties(props);
  }

  @reads('id')
  name;

  @computed('id')
  get slug() {
    if (!this.id) return '';

    let slug = this.id.toLowerCase();
    slug = slug.replace(/[^a-z ]/g, '');
    slug = slug.replace(/ /g, '-');

    return slug;
  }

  @computed('startAt', 'endAt')
  get progress() {
    const startTime = new Date(this.startAt).getTime();
    const endTime = new Date(this.endAt).getTime();
    const currentTime = new Date().getTime();

    const progress = (currentTime - startTime) / (endTime - startTime);
    return Math.round(progress * 100) / 100;
  }
}
