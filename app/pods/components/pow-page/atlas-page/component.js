// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type, optional} from '@ember-decorators/argument/type';

export default class PageAtlas extends Component {
  @argument
  @type(optional('object'))
  currentMap = null;
}
