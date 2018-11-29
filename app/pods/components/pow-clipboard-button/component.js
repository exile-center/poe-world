// Vendor
import Component from '@ember/component';

export default class ClipboardButton extends Component {
  isCopied = false;
  value = null;
  onClick = () => {};

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
