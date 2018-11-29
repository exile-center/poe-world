// Vendor
import Component from '@ember/component';
import {computed} from '@ember-decorators/object';
import {argument} from '@ember-decorators/argument';
import {type} from '@ember-decorators/argument/type';

const LAYOUT_RATINGS_KEY = {
  A: 'components.page.map_information_page.layout_rating_A',
  B: 'components.page.map_information_page.layout_rating_B',
  C: 'components.page.map_information_page.layout_rating_C'
};

export default class PageMapInformation extends Component {
  @argument
  @type('object')
  map = null;

  @computed('map.layoutRating')
  get layoutRatingDescriptionKey() {
    const layoutRating = this.get('map.layoutRating');
    if (!layoutRating || !LAYOUT_RATINGS_KEY[layoutRating]) return null;

    return LAYOUT_RATINGS_KEY[layoutRating];
  }
}
