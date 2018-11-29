// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';
import {not} from '@ember-decorators/object/computed';

export default class GlobalState extends Service {
  @service('authentication/setting')
  authenticationSetting;

  isDesktop = null;
  isAuthenticated = null;

  constructor() {
    super(...arguments);

    this.set('isDesktop', window.ELECTRON);
    this.set('isAuthenticated', Boolean(this.authenticationSetting.poesessid));
  }

  @not('isDesktop')
  isWeb;
}
