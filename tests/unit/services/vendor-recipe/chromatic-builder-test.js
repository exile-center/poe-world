// Vendor
import {expect} from 'chai';
import {describe, beforeEach, it} from 'mocha';
import {setupTest} from 'ember-mocha';

// Factories
import createStashItem from 'poe-world/tests/utilities/factories/stash-item';

describe('Unit | Services | Vendor recipe | Chromatic builder', () => {
  setupTest();

  let service;

  beforeEach(function() {
    service = this.owner.lookup('service:vendor-recipe/chromatic-builder');
  });

  describe('build', () => {
    it('should match the compatible items', () => {
      const {itemCount} = service.build([
        createStashItem({socketGroups: ['RGB']}),
        createStashItem({socketGroups: ['RGBB']}),
        createStashItem({socketGroups: ['RBBB']}),
        createStashItem({socketGroups: ['R', 'GBB']}),
        createStashItem({socketGroups: ['RGBRRR']}),
        createStashItem({socketGroups: ['R', 'G', 'B', 'B', 'B', 'B']}),
        createStashItem({socketGroups: []})
      ]);

      expect(itemCount).to.equal(2);
    });

    it('should apply the proper currency/item ratio', () => {
      const {recipeCount} = service.build([createStashItem({socketGroups: [['R', 'G', 'B']]})]);

      expect(recipeCount).to.equal(1);
    });
  });
});
