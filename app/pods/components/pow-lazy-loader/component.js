import Component from '@ember/component';
import InViewportMixin from 'ember-in-viewport';

export default Component.extend(InViewportMixin, {
  lazyLoadableTask: null,

  didEnterViewport() {
    this.lazyLoadableTask.perform();
  }
});
