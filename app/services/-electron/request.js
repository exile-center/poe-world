// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';
import {Promise} from 'rsvp';
import uuid from 'poe-world/utilities/uuid';

// Constants
const IPC_CHANNEL = 'REQUEST';
const FORBIDDEN_STATUS_CODE = 403;
const NOT_FOUND_STATUS_CODE = 404;

export default class Request extends Service {
  @service('i18n')
  i18n;

  @service('toaster')
  toaster;

  @service('global-state')
  globalState;

  @service('authentication/setting')
  authenticationSetting;

  fetch(url, params = {}) {
    return this._fetch('GET', url, params);
  }

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
  }

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

        if ([FORBIDDEN_STATUS_CODE, NOT_FOUND_STATUS_CODE].includes(error.statusCode)) {
          this.globalState.set('isAuthenticated', false);
        }

        return reject(error);
      });
    });
  }
}
