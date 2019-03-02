// Vendor
import EmberObject from '@ember/object';
import {A} from '@ember/array';

export default class Dashboard extends EmberObject {
  id = null;
  label = '';
  widgets = null; // 2d array

  constructor(props = {}) {
    super(props);

    this.setProperties({
      ...props,
      widgets: props.widgets ? A(props.widgets.map(A)) : A([A([])])
    });
  }

  asJson() {
    return {
      ...this.getProperties('id', 'label', 'updatedAt'),
      widgets: this.widgets.toArray().map(widgets => widgets.toArray())
    };
  }
}
