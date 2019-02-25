import {helper} from '@ember/component/helper';
import {htmlSafe} from '@ember/string';

const cssStyle = ([attribute, value]) => {
  if (attribute.includes('image')) value = `url('${value}')`;

  return htmlSafe(`${attribute}: ${value};`);
};

export default helper(cssStyle);
