import {A} from '@ember/array';
import Service, {inject as service} from '@ember/service';
import EmberObject from '@ember/object';
import {task, timeout} from 'ember-concurrency';
import uuid from 'poe-world/utilities/uuid';

// Constants
const TOAST_DATA = {
  id: null,
  message: '',
  duration: 5000,
  type: '',
  isVisible: true
};
const OUT_DELAY = 200;
const DANGER_TYPE = 'danger';

export default Service.extend({
  i18n: service('i18n'),

  toasts: A([]),

  toastExpiryTask: task(function *(toast) {
    yield timeout(toast.duration);
    toast.set('isVisible', false);

    yield timeout(OUT_DELAY);
    this.toasts.removeObject(toast);
  }),

  toastUnexpectedError() {
    return this.toastError(this.i18n.t('services.toaster.unexpected_error').string);
  },

  toastError(message) {
    return this._createToast({
      message,
      type: DANGER_TYPE
    });
  },

  _createToast(data) {
    const newToast = EmberObject.create({
      ...TOAST_DATA,
      ...data,
      id: uuid()
    });

    this.toasts.pushObject(newToast);
    this.toastExpiryTask.perform(newToast);
    return newToast;
  }
});
