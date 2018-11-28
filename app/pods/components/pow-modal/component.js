// Vendor
import Component from '@ember/component';
import {equal} from '@ember-decorators/object/computed';
import {observes} from '@ember-decorators/object';

export default class Component extends Component {
  title = '';
  isOpened = false;
  onClose = () => {};
  size = null;

  @equal('size', 'large')
  isLarge;

  @equal('size', 'small')
  isSmall;

  @observes('isOpened')
  openedStateObserver() {
    if (this.isOpened) return this.$('[data-toggle="modal"]').modal('show');
    return this.$('[data-toggle="modal"]').modal('hide');
  }

  didInsertElement() {
    this.$('[data-toggle="modal"]')
      .modal({
        backdrop: true,
        keyboard: true,
        focus: false,
        show: this.isOpened
      })
      .on('hidden.bs.modal', () => this.onClose());
  }
}
