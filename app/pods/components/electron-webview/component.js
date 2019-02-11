// Vendor
import Component from '@ember/component';
import {task, timeout} from 'ember-concurrency';
import {argument} from '@ember-decorators/argument';
import {type, optional} from '@ember-decorators/argument/type';

// Constants
const SCROLL_TIMEOUT = 1000;

export default class ElectronWebview extends Component {
  @argument
  @type('string')
  url;

  @argument
  @type(optional('number'))
  offset = 0;

  @argument
  @type(optional(Function))
  onUrlChange;

  webview = null;

  didNavigateTask = task(function*(url) {
    if (this.onUrlChange) this.onUrlChange(url);

    if (!this.offset) return;
    yield timeout(SCROLL_TIMEOUT);

    this.webview.executeJavaScript(`window.scroll({top: ${this.offset}, left: 0, behavior: 'smooth'});`);
  }).restartable();

  didInsertElement() {
    const webview = this.$('webview')[0];
    this.set('webview', webview);

    webview.addEventListener('did-navigate', ({url}) => this.get('didNavigateTask').perform(url));
    webview.addEventListener('did-navigate-in-page', ({url}) => this.get('didNavigateTask').perform(url));
  }
}
