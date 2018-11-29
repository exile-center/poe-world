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
  @type(Function)
  onUrlChange;

  didNavigateTask = task(function*(url) {
    this.onUrlChange(url);

    if (!this.offset) return;
    yield timeout(SCROLL_TIMEOUT);

    const webview = this.$('webview')[0];
    webview.executeJavaScript(`window.scroll({top: ${this.offset}, left: 0, behavior: 'smooth'});`);
  }).restartable();

  didInsertElement() {
    const webview = this.$('webview')[0];

    webview.addEventListener('did-navigate', ({url}) => this.get('didNavigateTask').perform(url));
    webview.addEventListener('did-navigate-in-page', ({url}) => this.get('didNavigateTask').perform(url));
  }
}
