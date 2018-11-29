// Vendor
import Route from '@ember/routing/route';

export default class MapTrade extends Route {
  model() {
    return this.modelFor('atlas.map');
  }
}
