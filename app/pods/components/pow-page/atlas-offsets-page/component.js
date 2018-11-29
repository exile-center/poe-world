/* eslint-disable no-console */
// Vendor
import Component from '@ember/component';
import MAPS from 'poe-world/constants/maps';
import {tagName} from '@ember-decorators/component';

@tagName('')
export default class PageAtlasOffsets extends Component {
  offsetData = null;
  mapsToConfigure = null;

  willInsertElement() {
    this.offsetData = {};

    this.mapsToConfigure = Object.keys(MAPS).sort((mapIdA, mapIdB) => {
      return (MAPS[mapIdA].tier || Infinity) - (MAPS[mapIdB].tier || Infinity);
    });

    this._promptForNextMap();
  }

  contextMenu(event) {
    const {offsetX, offsetY} = event;

    event.preventDefault();

    if (this.mapsToConfigure.length === 0) return;

    this.offsetData[this.mapsToConfigure.shift()] = {
      offsetLeft: offsetX,
      offsetTop: offsetY
    };

    if (this.mapsToConfigure.length) return this._promptForNextMap();

    this._promptData();
  }

  _promptForNextMap() {
    console.log(`Right click on the middle of "${this.mapsToConfigure[0]}".`);
  }

  _promptData() {
    console.log('Run "npm run compile-maps" with the following parameter:');
    console.log(`'${JSON.stringify(this.offsetData)}'`);
  }
}
/* eslint-enable no-console */
