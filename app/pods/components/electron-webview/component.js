// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type, optional} from '@ember-decorators/argument/type';

export default class ElectronWebview extends Component {
  @argument
  @type('string')
  url;

  @argument
  @type(optional(Function))
  onUrlChange;

  @argument
  @type(optional(Function))
  onReady;

  webview = null;

  didInsertElement() {
    const webview = this.$('webview')[0];
    this.set('webview', webview);

    webview.addEventListener('did-navigate', ({url}) => this._handleNavigate(url));
    webview.addEventListener('did-navigate-in-page', ({url}) => this._handleNavigate(url));

    if (this.onReady) this.onReady(this._publicReference());
  }

  _handleNavigate(url) {
    if (this.onUrlChange) this.onUrlChange(url);
  }

  _publicReference() {
    return {
      navigateTo: (url, params) => this.webview.loadURL(url, params),
      reload: () => this.webview.reload()
    };
  }
}
