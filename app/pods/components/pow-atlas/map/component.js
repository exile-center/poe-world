// Vendor
import {argument} from '@ember-decorators/argument';
import {type, optional} from '@ember-decorators/argument/type';
import Component from '@ember/component';
import {tagName} from '@ember-decorators/component';
import {computed} from '@ember-decorators/object';

@tagName('')
export default class AtlasMap extends Component {
  @argument
  @type(optional('object'))
  map;

  @argument
  @type(optional('object'))
  currentMap;

  @argument
  @type(optional('object'))
  hoveredMap;

  @argument
  @type(Function)
  onMapClick;

  @computed('map', 'currentMap', 'hoveredMap')
  get isActive() {
    if (this.currentMap && this.map.id === this.currentMap.id) return true;
    if (this.hoveredMap && this.map.id === this.hoveredMap.id) return true;

    return false;
  }
}
