import {registerDeprecationHandler} from '@ember/debug';

const silencedDeprecationIds = ['ember-meta.descriptor-on-object'];

export const initialize = () => {
  registerDeprecationHandler((message, options, next) => {
    if (silencedDeprecationIds.includes(options.id)) return;

    next(message, options);
  });
};

export default {
  initialize
};
