// Vendor
import Service from '@ember/service';

export default class UrlOpener extends Service {
  open(url) {
    const {shell} = requireNode('electron');

    shell.openExternal(url);
  }
}
