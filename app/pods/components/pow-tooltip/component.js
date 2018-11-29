// Vendor
import Component from '@ember/component';

export default class Tooltip extends Component {
  placement = 'auto';
  title = '';

  didInsertElement() {
    this.$().tooltip({
      placement: this.placement,
      title: this.title.toString()
    });
  }
}
