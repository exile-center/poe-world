// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';

export default class Component extends Component {
  localClassNames = 'map-page';

  @service('router')
  router;

  @service('atlas/reframer')
  atlasReframer;

  map = null;

  back() {
    this.atlasReframer.resetMapZoom();
    this.router.transitionTo('atlas');
  }
}
