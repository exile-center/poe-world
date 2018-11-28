// Vendor
import Component from '@ember/component';
import InViewportMixin from 'ember-in-viewport';

export default class Component extends Component.extend(InViewportMixin) {
  lazyLoadableTask = null;

  didEnterViewport() {
    this.lazyLoadableTask.perform();
  }
}
