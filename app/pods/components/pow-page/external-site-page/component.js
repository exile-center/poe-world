// Vendor
import Component from '@ember/component';
import {tagName} from '@ember-decorators/component';
import {argument} from '@ember-decorators/argument';
import {type} from '@ember-decorators/argument/type';

@tagName('')
export default class PageExternalSite extends Component {
  @argument
  @type('string')
  url;
}
