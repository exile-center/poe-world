// Vendor
import Service from '@ember/service';

export default class Storage extends Service {
  getValue(key, params = {}) {
    const {defaultValue, leagueSlug} = params;

    if (leagueSlug) key = `${key}--${leagueSlug}`;

    const entry = this._localStorageGetEntry(key);
    if (!entry || this._isEntryExpired(entry)) return defaultValue || null;

    return entry.value;
  }

  setValue(key, value, params = {}) {
    const {duration, leagueSlug} = params;

    const newEntry = {value};
    if (duration) newEntry.expiredAt = this._currentTimestamp() + duration;
    if (leagueSlug) key = `${key}--${leagueSlug}`;

    this._localStorageSetEntry(key, newEntry);
  }

  cleanup() {
    Object.keys(window.localStorage).forEach(key => {
      let isValid = true;

      if (this._isEntryExpired(this._localStorageGetEntry(key))) isValid = false;

      if (isValid) return;

      this._localStorageRemoveEntry(key);
    });
  }

  _localStorageGetEntry(key) {
    const rawEntry = window.localStorage.getItem(key);

    if (!rawEntry) return null;

    return JSON.parse(rawEntry);
  }

  _localStorageSetEntry(key, entry) {
    window.localStorage.setItem(key, JSON.stringify(entry));
  }

  _localStorageRemoveEntry(key) {
    window.localStorage.removeItem(key);
  }

  _currentTimestamp() {
    return Date.now() / 1000;
  }

  _isEntryExpired(entry) {
    if (!entry.expiredAt) return false;

    return entry.expiredAt < this._currentTimestamp();
  }
}
