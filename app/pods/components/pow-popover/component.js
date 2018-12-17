// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type, unionOf} from '@ember-decorators/argument/type';
import {attribute} from '@ember-decorators/component';
import {task, timeout} from 'ember-concurrency';

// Constants
const POPOVER_COOLDOWN = 750;

export default class Popover extends Component {
  @argument
  @type(unionOf('object', 'string'))
  title = null;

  @attribute
  popover = true;

  triggerPopoverTask = task(function*() {
    this.$().popover('show');
    yield timeout(POPOVER_COOLDOWN);
  }).drop();

  didInsertElement() {
    const $popoverContent = this.$('[popover-content]');
    const content = $popoverContent.html();
    $popoverContent.remove();

    this.$().popover({
      container: 'body',
      trigger: 'manual',
      html: true,
      title: this.title,
      content
    });
  }

  mouseEnter() {
    this.get('triggerPopoverTask').perform();
  }

  mouseLeave() {
    this.$().popover('hide');
  }
}
