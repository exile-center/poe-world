// Vendor
import EmberObject from '@ember/object';
import {A} from '@ember/array';
import {bool} from '@ember-decorators/object/computed';

export default class Dashboard extends EmberObject {
  id = null;
  label = '';
  widgets = null; // 2d array

  @bool('widgets.firstObject.length')
  hasWidgets;

  constructor(props = {}) {
    super(props);

    this.setProperties({
      ...props,
      widgets: props.widgets ? A(props.widgets.map(A)) : A([A([])])
    });
  }

  addWidget(widget, columnIndex) {
    if (this.widgets.length <= columnIndex) this.widgets.addObject(A([]))

    this.widgets.objectAt(columnIndex).addObject(widget);
  }

  asJson() {
    return {
      ...this.getProperties('id', 'label', 'updatedAt'),
      widgets: this.widgets.toArray().map(widgets => widgets.toArray())
    };
  }
}
