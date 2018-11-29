// Vendor
import {attribute, tagName} from '@ember-decorators/component';
import Component from '@ember/component';
import {service} from '@ember-decorators/service';

@tagName('a')
export default class ExternalLink extends Component {
  @service('global-state')
  globalState;

  @service('-electron/url-opener')
  electronUrlOpener;

  localClassNames = 'external-link';

  @attribute
  href = '#';

  url = '';

  click(event) {
    event.preventDefault();
    const {url, globalState, electronUrlOpener} = this;

    if (globalState.isWeb) return window.open(url, '_blank').focus();

    electronUrlOpener.open(url);
  }
}
