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

  @argument
  @type(Function)
  onMapHover;

  @argument
  @type(Function)
  onMapSearchClear;

  query = '';
  isActive = false;

  searchChange(query) {
    this.setProperties({
      query,
      isActive: true
    });

    this.onMapSearch(query);
  }

  searchFocus() {
    this.set('isActive', true);
  }

  searchBlur() {
    if (this.query) return;

    this.set('isActive', false);
  }

  searchClear() {
    this.setProperties({
      query: '',
      isActive: false
    });

    this.onMapSearchClear();
  }
}
