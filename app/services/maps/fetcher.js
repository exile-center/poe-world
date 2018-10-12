import Service, {inject as service} from '@ember/service';
import Map from 'poe-world/models/map';
import RESOURCES from 'poe-world/constants/resources';

export default Service.extend({
  request: service('request'),

  _mapsPromise: null,

  fetch() {
    if (this._mapsPromise) return this._mapsPromise;

    const mapsPromise = this.request.fetch(RESOURCES.MAPS_JSON_URL).then((rawMaps) => {
      return this._processRawMaps(rawMaps);
    });

    this.set('_mapsPromise', mapsPromise);
    return mapsPromise;
  },

  fetchMap(mapId) {
    return this.fetch().then((maps) => maps.find((map) => map.id === mapId));
  },

  _processRawMaps(rawMaps) {
    const mapHash = rawMaps.reduce((mapHash, rawMap) => {
      mapHash[rawMap.id] = Map.create(rawMap);
      return mapHash;
    }, {});

    const maps = Object.values(mapHash);
    maps.forEach((map) => map.set('sextants', map.sextants.map((mapId) => mapHash[mapId])));

    return maps;
  }
});
