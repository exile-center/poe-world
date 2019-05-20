// Vendor
import Service from '@ember/service';

// Migrations
import dexieMigrations from 'poe-world/dexie-migrations';

// Constants
const DB_NAME = 'PoeWorld';

export default class Dexie extends Service {
  setup() {
    const db = new window.Dexie(DB_NAME);

    let dbVersion = 1;
    dexieMigrations.forEach(migration => db.version(dbVersion++).stores(migration));

    this.set('db', db);
  }

  getTable(tableName) {
    return this.db[tableName];
  }
}
