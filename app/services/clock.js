// Vendor
import Service from '@ember/service';
import {task, timeout} from 'ember-concurrency';

// Constants
const ONE_MINUTE = 60000;

export default class Clock extends Service {
  constructor() {
    super(...arguments);

    this.get('minuteTick').perform();
  }

  minute = 0;
  hour = 0;

  minuteTick = task(function*() {
    while (true) {
      yield timeout(ONE_MINUTE);

      this.incrementProperty('minute');
      if (this.minute % 60 === 0) this.incrementProperty('hour');
    }
  });
}
