// Vendor
import Component from '@ember/component';
import {argument} from "@ember-decorators/argument";
import {type, arrayOf} from '@ember-decorators/argument/type';

export default class PageDashboardWidgetBoardAddDropdown extends Component {
  @argument
  @type(arrayOf('object'))
  availableWidgets;

  @argument
  @type(Function)
  onWidgetAdd;
}
