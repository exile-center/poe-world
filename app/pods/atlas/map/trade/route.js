// Vendor
import Route from '@ember/routing/route';

export default class Route extends Route {
  model() {
    return this.modelFor('atlas.map');
  }
}
