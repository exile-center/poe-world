// Base class
import BaseModel from 'poe-world/models/dexie/base-model';

export default class Dashboard extends BaseModel {
  serializableFields = ['name'];

  name;
}
