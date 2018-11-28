import Service, {inject as service} from '@ember/service';
import {Promise} from 'rsvp';
import uuid from 'poe-world/utilities/uuid';

// Constants
const IPC_CHANNEL = 'REQUEST';
const AUTHENTICATION_ERROR_CODES = [403, 404]; // 404 is raised for an invalid account name

export default Service.extend({
  i18n: service('i18n'),
  toaster: service('toaster'),
  globalState: service('global-state'),
  authenticationSetting: service('authentication/setting'),

  fetch(url, params = {}) {
    return this._fetch('GET', url, params);
  },

  privateFetch(url, params = {}) {
    const poesessid = this.authenticationSetting.poesessid;

    if (!poesessid) {
      this.globalState.set('isAuthenticated', false);
      return Promise.reject();
    }

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

        this.globalState.set('isAuthenticated', true);

        return resolve(JSON.parse(data));
      });

      ipcRenderer.once(responseErrorChannel, (_event, error) => {
        ipcRenderer.removeAllListeners(responseSuccessChannel);

        if (AUTHENTICATION_ERROR_CODES.includes(error.statusCode)) {
          this.globalState.set('isAuthenticated', false);
        }

        return reject(error);
      });
    });
  }
});
