// Vendor
import Component from '@ember/component';

export default Component.extend({
  title: null,

  didInsertElement() {
    const $popoverContent = this.$('[data-popover-content]');
    const content = $popoverContent.html();
    $popoverContent.remove();

    this.$().popover({
      container: 'body',
      trigger: 'hover',
      html: true,
      title: this.title,
      content
    });
  }
});