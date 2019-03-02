// Vendor
import Component from '@ember/component';

// Constants
const SCROLL_COEFFICIENT = 40; // Without this the scroll would be SUPER slow

export default class HorizontalContainer extends Component {
  didInsertElement() {
    const $this = this.$();

    $this.css({
      'overflow-x': 'auto',
      'overflow-y': 'hidden'
    });

    $this.on('mousewheel', this._handleScroll.bind(this));
  }


  willDestroyElement() {
    this.$().off('mousewheel');
  }

  _handleScroll(event) {
    event.preventDefault();

    const $this = this.$();
    const currentScrollLeft = $this.scrollLeft();
    const delta = Math.max(-1, Math.min(1, event.originalEvent.wheelDelta));

    $this.scrollLeft(currentScrollLeft + (delta * SCROLL_COEFFICIENT));
  }
}
