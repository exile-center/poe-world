// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type, unionOf} from '@ember-decorators/argument/type';

export default class Popover extends Component {
  @argument
  @type(unionOf('object', 'string'))
  title = null;

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
}
