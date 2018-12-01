// Vendor
import {expect} from 'chai';
import {describe, beforeEach, it} from 'mocha';
import {setupTest} from 'ember-mocha';

// Factories
import createPricing from 'poe-world/tests/utilities/factories/pricing';
import createStashItem from 'poe-world/tests/utilities/factories/stash-item';

describe('Unit | Services | Divination summary | Builder', () => {
  setupTest();

  let service;

  beforeEach(function() {
    service = this.owner.lookup('service:divination-summary/builder');
  });

  describe('build', () => {
    it('should match compatible items with the pricing map', () => {
      const results = service.build(
        [
          createStashItem({name: 'Doctor', slug: 'doc', explicitMods: ['some mod'], topCategory: 'cards'}),
          createStashItem({name: 'Nope', slug: 'nope', topCategory: 'cards'})
        ],
        {
          doc: createPricing({chaosValue: 2, exaltedValue: 1, slug: 'doc'}),
          boo: createPricing({slug: 'boo'})
        }
      );

      expect(results).to.have.lengthOf(1);

      const [doctorResult] = results;
      expect(doctorResult.cardName).to.equal('Doctor');
      expect(doctorResult.cardSlug).to.equal('doc');
      expect(doctorResult.cardMods).to.have.members(['some mod']);
      expect(doctorResult.chaosValue).to.equal(2);
      expect(doctorResult.exaltedValue).to.equal(1);
    });

    it('should exclude items that are not cards', () => {
      const results = service.build([createStashItem({slug: 'doc', topCategory: 'belt'})], {
        doc: createPricing({chaosValue: 2, exaltedValue: 1, slug: 'doc'})
      });

      expect(results).to.have.lengthOf(0);
    });

    it('should aggregate identical items', () => {
      const results = service.build(
        [
          createStashItem({slug: 'doc', quantity: 10, maxStackSize: 2, topCategory: 'cards'}),
          createStashItem({slug: 'doc', quantity: 10, maxStackSize: 2, topCategory: 'cards'})
        ],
        {
          doc: createPricing({chaosValue: 4, exaltedValue: 2, slug: 'doc'})
        }
      );

      const [doctorResult] = results;
      expect(doctorResult.quantity).to.equal(20);
      expect(doctorResult.stackCount).to.equal(10);
      expect(doctorResult.chaosValue).to.equal(4);
      expect(doctorResult.exaltedValue).to.equal(2);
      expect(doctorResult.chaosTotalValue).to.equal(80);
      expect(doctorResult.exaltedTotalValue).to.equal(40);
    });

    it('should sort the results by value', () => {
      const results = service.build(
        [
          createStashItem({slug: 'second', quantity: 1, topCategory: 'cards'}),
          createStashItem({slug: 'first', quantity: 1, topCategory: 'cards'})
        ],
        {
          second: createPricing({chaosValue: 5, slug: 'second'}),
          first: createPricing({chaosValue: 10, slug: 'first'})
        }
      );

      const [firstResult, secondResult] = results;
      expect(firstResult.cardSlug).to.equal('first');
      expect(secondResult.cardSlug).to.equal('second');
    });
  });
});
