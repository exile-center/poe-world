// Vendor
import Route from '@ember/routing/route';

export default class MapInformation extends Route {
  model() {
    return this.modelFor('atlas.map');
  }
}
