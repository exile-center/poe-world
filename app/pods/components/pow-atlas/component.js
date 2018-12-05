// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {task} from 'ember-concurrency';
import {argument} from '@ember-decorators/argument';
import {type, optional} from '@ember-decorators/argument/type';
import {action} from '@ember-decorators/object';

export default class Atlas extends Component {
  @service('router')
  router;

  @service('maps/fetcher')
  mapsFetcher;

  @service('atlas/reframer')
  atlasReframer;

  @argument
  @type(optional('object'))
  currentMap = null;

  maps = null;

  mapsLoadTask = task(function*() {
    const maps = yield this.mapsFetcher.fetch();
    this.set('maps', maps);
  }).drop();

  willInsertElement() {
    this.get('mapsLoadTask').perform();
  }

  @action
  navigateToMap(map) {
    this.router.transitionTo('atlas.map', map.id);
  }

  @action
  panzoom() {
    this.$('[popover]').popover('hide');
  }

  @action
  panzoomInitialize(panzoomRef) {
    this.atlasReframer.initialize(panzoomRef);
  }
}
