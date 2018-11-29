// Vendor
import {argument} from '@ember-decorators/argument';
import {type, arrayOf, optional} from '@ember-decorators/argument/type';
import Component from '@ember/component';

export default class AtlasMaps extends Component {
  @argument
  @type(optional('object'))
  currentMap;

  @argument
  @type(arrayOf('object'))
  maps;

  @argument
  @type(Function)
  onMapClick;
}
