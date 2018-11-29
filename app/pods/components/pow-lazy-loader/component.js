// Vendor
import Component from '@ember/component';
import InViewportMixin from 'ember-in-viewport';

export default class LazyLoader extends Component.extend(InViewportMixin) {
  lazyLoadableTask = null;

  didEnterViewport() {
    this.get('lazyLoadableTask').perform();
  }
}
