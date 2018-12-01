// Vendor
import {expect} from 'chai';
import {describe, beforeEach, it} from 'mocha';
import {setupTest} from 'ember-mocha';

// Factories
import createStashItem from 'poe-world/tests/utilities/factories/stash-item';

describe('Unit | Services | Vendor recipe | Jeweller builder', () => {
  setupTest();

  let service;

  beforeEach(function() {
    service = this.owner.lookup('service:vendor-recipe/jeweller-builder');
  });

  describe('build', () => {
    it('should match the compatible items', () => {
      const {itemCount} = service.build([
        createStashItem({socketCount: 6}),
        createStashItem({socketCount: 5}),
        createStashItem({socketCount: 0}),
        createStashItem({socketCount: null})
      ]);

      expect(itemCount).to.equal(1);
    });

    it('should apply the proper currency/item ratio', () => {
      const {recipeCount} = service.build([createStashItem({socketCount: 6}), createStashItem({socketCount: 6})]);

      expect(recipeCount).to.equal(14);
    });
  });
});
