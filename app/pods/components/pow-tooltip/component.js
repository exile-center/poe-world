// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type, optional, unionOf} from '@ember-decorators/argument/type';

export default class Tooltip extends Component {
  @argument
  @type(optional('string'))
  placement = 'auto';

  @argument
  @type(unionOf('object', 'string'))
  title;

  didInsertElement() {
    this.$().tooltip({
      placement: this.placement,
      title: this.title.toString()
    });
  }
}
