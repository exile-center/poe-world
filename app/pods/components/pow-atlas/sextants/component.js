// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {argument} from '@ember-decorators/argument';
import {type, optional} from '@ember-decorators/argument/type';

export default class AtlasSextants extends Component {
  @service('maps/fetcher')
  mapsFetcher;

  @argument
  @type(optional('object'))
  map = null;
}
