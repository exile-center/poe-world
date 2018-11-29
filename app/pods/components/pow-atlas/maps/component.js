// Vendor
import {classNames, tagName} from '@ember-decorators/component';
import {argument} from '@ember-decorators/argument';
import {type, arrayOf, optional} from '@ember-decorators/argument/type';
import Component from '@ember/component';

@classNames('list-unstyled')
@tagName('ul')
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
