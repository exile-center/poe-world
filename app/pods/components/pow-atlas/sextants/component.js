// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';

export default class AtlasSextants extends Component {
  @service('maps/fetcher')
  mapsFetcher;

  map = null;
}
