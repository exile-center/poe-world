// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type, optional, arrayOf} from '@ember-decorators/argument/type';
import {tagName} from '@ember-decorators/component';

@tagName('')
export default class AtlasSearcher extends Component {
  @argument
  @type(optional(arrayOf('object')))
  maps;

  @argument
  @type(Function)
  onMapSearch;

  @argument
  @type(Function)
  onMapSelect;

  query = '';
}
