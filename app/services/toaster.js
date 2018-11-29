// Vendor
import {A} from '@ember/array';
import Service from '@ember/service';
import {service} from '@ember-decorators/service';
import EmberObject from '@ember/object';
import {task, timeout} from 'ember-concurrency';
import uuid from 'poe-world/utilities/uuid';

// Constants
const OUT_DELAY = 200;
const DANGER_TYPE = 'danger';

export default class Toaster extends Service {
  @service('i18n')
  i18n;

  toasts = A([]);

  toastExpiryTask = task(function*(toast) {
    yield timeout(toast.duration);
    toast.set('isVisible', false);

    yield timeout(OUT_DELAY);
    this.toasts.removeObject(toast);
  }).drop();

  toastUnexpectedError() {
    return this.toastError(this.i18n.t('services.toaster.unexpected_error').string);
  }

  toastError(message) {
    return this._createToast(message, DANGER_TYPE);
  }

  _createToast(message, type) {
    const newToast = EmberObject.create({
      id: uuid(),
      message,
      duration: 5000,
      type,
      isVisible: true
    });

    this.toasts.pushObject(newToast);
    this.get('toastExpiryTask').perform(newToast);
    return newToast;
  }
}
