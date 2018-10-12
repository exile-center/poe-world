// Vendors
import Component from '@ember/component';
import {task, timeout} from 'ember-concurrency';

// Constants
const SCROLL_TIMEOUT = 1000;

export default Component.extend({
  localClassNames: 'electron-webview',

  url: '',
  offset: 0,
  onUrlChange: () => {},

  didNavigateTask: task(function *(url) {
    this.onUrlChange(url);

    if (!this.offset) return;
    yield timeout(SCROLL_TIMEOUT);

    const webview = this.$('webview')[0];
    webview.executeJavaScript(`window.scroll({top: ${this.offset}, left: 0, behavior: 'smooth'});`);
  }).restartable(),

  didInsertElement() {
    const webview = this.$('webview')[0];

    webview.addEventListener('did-navigate', ({url}) => this.didNavigateTask.perform(url));
    webview.addEventListener('did-navigate-in-page', ({url}) => this.didNavigateTask.perform(url));
  }
});
