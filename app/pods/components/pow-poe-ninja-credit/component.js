// Vendor
import {tagName} from '@ember-decorators/component';
import Component from '@ember/component';
import POE_NINJA from 'poe-world/constants/poe-ninja';

@tagName('')
export default class PoeNinjaCredit extends Component {
  websiteUrl = POE_NINJA.WEB_URL;
}
