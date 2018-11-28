// Vendor
import Service from '@ember/service';
import {Promise} from 'rsvp';
import fetch from 'fetch';

// Constants
const MIN_ERROR_STATUS = 400;

export default class Request extends Service {
  fetch(url, params = {}) {
    return this._fetch('GET', url, params);
  }

  _fetch(method, url, params = {}) {
    const fetchParams = {
      ...params,
      method
    };

    return new Promise((resolve, reject) => {
      fetch(url, fetchParams).then(response => {
        if (response.status >= MIN_ERROR_STATUS) return reject(null);

        response.json().then(resolve);
      });
    });
  }
}
