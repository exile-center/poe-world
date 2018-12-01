// Vendor
import {expect} from 'chai';
import {describe, beforeEach, it} from 'mocha';
import {setupTest} from 'ember-mocha';

// Factories
import createStashItem from 'poe-world/tests/utilities/factories/stash-item';

describe('Unit | Services | Vendor recipe | Divine builder', () => {
  setupTest();

  let service;

  beforeEach(function() {
    service = this.owner.lookup('service:vendor-recipe/divine-builder');
  });

  describe('build', () => {
    it('should match the compatible items', () => {
      const {itemCount} = service.build([
        createStashItem({socketGroups: [['R', 'R', 'R', 'R', 'R', 'R']]}),
        createStashItem({socketGroups: [['R', 'R', 'R']]}),
        createStashItem({socketGroups: [['B'], ['B'], ['B'], ['B'], ['B'], ['B']]}),
        createStashItem({socketGroups: []})
      ]);

      expect(itemCount).to.equal(1);
    });

    it('should apply the proper currency/item ratio', () => {
      const {recipeCount} = service.build([createStashItem({socketGroups: [['R', 'R', 'R', 'R', 'R', 'R']]})]);

      expect(recipeCount).to.equal(1);
    });
  });
});
