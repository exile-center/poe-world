// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type} from '@ember-decorators/argument/type';
import {task, timeout} from 'ember-concurrency';
import {tagName} from '@ember-decorators/component';
import {action} from '@ember-decorators/object';

// Constants
const HOLD_DELAY = 1500; // 1.5 seconds

@tagName('')
export default class HoldButton extends Component {
  @argument
  @type('string')
  type = 'primary';

  @argument
  @type(Function)
  onHold;

  cssAnimationDuration = `${HOLD_DELAY}ms`;

  holdTask = task(function*() {
    yield timeout(HOLD_DELAY);
    this.onHold();
  }).drop();

  @action
  startHolding() {
    this.get('holdTask').perform();
  }

  @action
  stopHolding() {
    this.get('holdTask').cancelAll();
  }
}
