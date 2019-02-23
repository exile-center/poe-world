// Vendor
import {helper} from '@ember/component/helper';
import {htmlSafe} from '@ember/string';

const cssPercentWidth = ([value]) => {
  return htmlSafe(`width: ${Math.round(value * 100)}%;`);
};

export default helper(cssPercentWidth);
