// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {argument} from '@ember-decorators/argument';
import {type} from '@ember-decorators/argument/type';
import {tagName} from '@ember-decorators/component';

@tagName('')
export default class PageMap extends Component {
  @service('router')
  router;

  @service('atlas/reframer')
  atlasReframer;

  @argument
  @type('object')
  map = null;

  back() {
    this.atlasReframer.resetMapZoom();
    this.router.transitionTo('atlas');
  }
}
