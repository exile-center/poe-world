// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type} from '@ember-decorators/argument/type';
import {computed} from '@ember-decorators/object';
import {A as emberArray} from '@ember/array';

export default class PageDashboardWidgetBoard extends Component {
  @argument
  widgets;

  @argument
  @type('boolean')
  widgetsAreLocked;

  @argument
  @type(Function)
  addWidget;

  @argument
  @type(Function)
  updateWidget;

  @argument
  @type(Function)
  deleteWidget;

  @computed('widgets.[]')
  get widgetsGrid() {
    if (!this.widgets || !this.widgets.length) return emberArray([]);

    return this._sortWidgets(this.widgets).reduce((columns, widget) => {
      if (!columns.objectAt(widget.column)) columns.addObject(emberArray([]));
      columns.objectAt(widget.column).addObject(widget);

      return columns;
    }, emberArray([]));
  }

  _sortWidgets(widgets) {
    return widgets.toArray().sort((widgetA, widgetB) => {
      if (widgetA.column === widgetB.column) return widgetA.row - widgetB.row;
      return widgetA.column - widgetB.column;
    });
  }
}
