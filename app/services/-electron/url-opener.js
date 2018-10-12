import Service from '@ember/service';

export default Service.extend({
  open(url) {
    const {shell} = requireNode('electron');

    shell.openExternal(url);
  }
});
