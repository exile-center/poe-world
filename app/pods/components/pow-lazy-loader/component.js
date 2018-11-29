// Vendor
import Component from '@ember/component';
import InViewportMixin from 'ember-in-viewport';
import {argument} from '@ember-decorators/argument';
import {type} from '@ember-decorators/argument/type';

export default class LazyLoader extends Component.extend(InViewportMixin) {
  @argument
  @type('object')
  lazyLoadableTask = null;

  didEnterViewport() {
    this.get('lazyLoadableTask').perform();
  }
}
