// Base class
import BaseModel from 'poe-world/models/dexie/base-model';

export default class DashboardWidget extends BaseModel {
  serializableFields = ['dashboardId', 'column', 'row', 'type', 'state', 'settings'];

  dashboardId;
  column;
  row;
  type;
  state;
  settings;
}
