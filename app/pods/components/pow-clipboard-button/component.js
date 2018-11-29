// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type, optional} from '@ember-decorators/argument/type';

export default class ClipboardButton extends Component {
  @argument
  @type('string')
  value = null;

  @argument
  @type(optional(Function))
  onClick = () => {};

  isCopied = false;

  copy() {
    this._copyToClipboard();
    this.onClick();
    this.set('isCopied', true);
  }

  /* eslint-disable no-alert */
  _copyToClipboard() {
    try {
      this.$('input').select();
      document.execCommand('copy');
    } catch (_error) {
      prompt('Copy whisper', this.get('item.trade.whisper'));
    }
  }
  /* eslint-enable no-alert */
}
