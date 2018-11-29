// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type, arrayOf} from '@ember-decorators/argument/type';

export default class TradeMapList extends Component {
  @argument
  @type(arrayOf('object'))
  tradeMaps = null;
}
