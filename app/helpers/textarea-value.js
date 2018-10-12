import {helper} from '@ember/component/helper';
import {htmlSafe} from '@ember/string';

const textareaValue = ([value]) => {
  return htmlSafe(value.replace(/\n/g, '<br>'));
};

export default helper(textareaValue);
