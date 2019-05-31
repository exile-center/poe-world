import DashboardWidget from 'poe-world/models/dexie/dashboard-widget';

export default props => {
  return DashboardWidget.create({
    column: 0,
    row: 0,
    type: 'fake-type',
    state: {},
    settings: {},

    ...props
  });
};
