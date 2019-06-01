// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type} from '@ember-decorators/argument/type';

// Constants
import DASHBOARD_WIDGETS from 'poe-world/constants/dashboard-widgets';

export default class PageDashboardsWidgetBoardAddDropdown extends Component {
  @argument
  @type(Function)
  onWidgetAdd;

  dashboardWidgets = Object.values(DASHBOARD_WIDGETS);
}
