// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';

export default class Component extends Component {
  @service('maps/fetcher')
  mapsFetcher;

  map = null;
}
