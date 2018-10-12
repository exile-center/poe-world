import Service, {inject as service} from '@ember/service';
import {Promise} from 'rsvp';
import PoeAuthenticationError from 'poe-world/errors/poe-authentication-error';
import uuid from 'poe-world/utilities/uuid';

// Constants
const IPC_CHANNEL = 'REQUEST';
const FORBIDDEN_STATUS_CODE = 403;

export default Service.extend({
  i18n: service('i18n'),
  toaster: service('toaster'),
  authenticationSetting: service('authentication/setting'),

  fetch(url, params = {}) {
    return this._fetch('GET', url, params);
  },

  privateFetch(url, params = {}) {
    const poesessid = this.authenticationSetting.poesessid;
    if (!poesessid) return Promise.reject(this._createAuthenticationError(params));

    return this._fetch('GET', url, {
      poesessid,
      ...params
    });
  },

  _fetch(method, url, params = {}) {
    const {ipcRenderer} = requireNode('electron');

    const id = uuid();
    const responseSuccessChannel = `${IPC_CHANNEL}-success-${id}`;
    const responseErrorChannel = `${IPC_CHANNEL}-error-${id}`;

    const requestParams = {
      ...params,
      responseSuccessChannel,
      responseErrorChannel,
      url,
      method
    };

    ipcRenderer.send(IPC_CHANNEL, requestParams);

    return new Promise((resolve, reject) => {
      ipcRenderer.once(responseSuccessChannel, (_event, data) => {
        ipcRenderer.removeAllListeners(responseErrorChannel);
        return resolve(JSON.parse(data));
      });

      ipcRenderer.once(responseErrorChannel, (_event, error) => {
        ipcRenderer.removeAllListeners(responseSuccessChannel);

        if (error.statusCode === FORBIDDEN_STATUS_CODE) return reject(this._createAuthenticationError(params));
        return reject(error);
      });
    });
  },

  _createAuthenticationError({toastAuthenticationError = true}) {
    if (toastAuthenticationError) {
      const message = this.i18n.t('services.electron.request.unauthenticated_error').string;
      this.toaster.toastError(message);
    }

    return new PoeAuthenticationError();
  }
});
