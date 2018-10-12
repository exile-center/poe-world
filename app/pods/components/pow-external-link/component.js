import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
  globalState: service('global-state'),
  electronUrlOpener: service('-electron/url-opener'),

  localClassNames: 'external-link',
  attributeBindings: ['href'],

  tagName: 'a',
  href: '#',

  url: '',

  click(event) {
    event.preventDefault();
    const {url, globalState, electronUrlOpener} = this.getProperties('url', 'globalState', 'electronUrlOpener');

    if (globalState.isWeb) return window.open(url, '_blank').focus();

    electronUrlOpener.open(url);
  }
});
