// Vendors
import Mixin from '@ember/object/mixin';
import $ from 'jquery';

export default Mixin.create({
  didInsertElement() {
    this._super(...arguments);

    this.$('[data-toggle="popover"]').each(function() {
      const popoverOptions = {
        container: 'body',
        trigger: 'hover',
        html: true
      };

      const $this = $(this);
      const $sibling = $this.next();

      if ($sibling.data('popover') !== undefined) {
        popoverOptions.content = $sibling.html();
      }

      $this.popover(popoverOptions);
    });
  }
});
