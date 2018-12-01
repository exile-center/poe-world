// Vendor
import {expect} from 'chai';
import {describe, beforeEach, it} from 'mocha';
import {setupTest} from 'ember-mocha';

// Factories
import createStashItem from 'poe-world/tests/utilities/factories/stash-item';

describe('Unit | Services | Vendor recipe | Chaos builder', () => {
  setupTest();

  let service;

  beforeEach(function() {
    service = this.owner.lookup('service:vendor-recipe/chaos-builder');
  });

  describe('build', () => {
    it('should properly count helmets', () => {
      const {helmet} = service.build([
        createStashItem({defaultCategory: 'helmet', itemLevel: 60, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'helmet', itemLevel: 75, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'helmet', itemLevel: 50, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'helmet', itemLevel: 75, identified: true, rarity: 'rare'}),
        createStashItem({defaultCategory: 'helmet', itemLevel: 75, identified: false, rarity: 'magic'})
      ]);

      expect(helmet.itemChaosCount).to.equal(1);
      expect(helmet.itemRegalCount).to.equal(1);
      expect(helmet.recipeCount).to.equal(2);
    });

    it('should properly count boots', () => {
      const {boots} = service.build([
        createStashItem({defaultCategory: 'boots', itemLevel: 60, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'boots', itemLevel: 75, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'boots', itemLevel: 50, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'boots', itemLevel: 75, identified: true, rarity: 'rare'}),
        createStashItem({defaultCategory: 'boots', itemLevel: 75, identified: false, rarity: 'magic'})
      ]);

      expect(boots.itemChaosCount).to.equal(1);
      expect(boots.itemRegalCount).to.equal(1);
      expect(boots.recipeCount).to.equal(2);
    });

    it('should properly count gloves', () => {
      const {gloves} = service.build([
        createStashItem({defaultCategory: 'gloves', itemLevel: 60, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'gloves', itemLevel: 75, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'gloves', itemLevel: 50, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'gloves', itemLevel: 75, identified: true, rarity: 'rare'}),
        createStashItem({defaultCategory: 'gloves', itemLevel: 75, identified: false, rarity: 'magic'})
      ]);

      expect(gloves.itemChaosCount).to.equal(1);
      expect(gloves.itemRegalCount).to.equal(1);
      expect(gloves.recipeCount).to.equal(2);
    });

    it('should properly count belts', () => {
      const {belt} = service.build([
        createStashItem({defaultCategory: 'belt', itemLevel: 60, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'belt', itemLevel: 75, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'belt', itemLevel: 50, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'belt', itemLevel: 75, identified: true, rarity: 'rare'}),
        createStashItem({defaultCategory: 'belt', itemLevel: 75, identified: false, rarity: 'magic'})
      ]);

      expect(belt.itemChaosCount).to.equal(1);
      expect(belt.itemRegalCount).to.equal(1);
      expect(belt.recipeCount).to.equal(2);
    });

    it('should properly count chests', () => {
      const {chest} = service.build([
        createStashItem({defaultCategory: 'chest', itemLevel: 60, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'chest', itemLevel: 75, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'chest', itemLevel: 50, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'chest', itemLevel: 75, identified: true, rarity: 'rare'}),
        createStashItem({defaultCategory: 'chest', itemLevel: 75, identified: false, rarity: 'magic'})
      ]);

      expect(chest.itemChaosCount).to.equal(1);
      expect(chest.itemRegalCount).to.equal(1);
      expect(chest.recipeCount).to.equal(2);
    });

    it('should properly count amulets', () => {
      const {amulet} = service.build([
        createStashItem({defaultCategory: 'amulet', itemLevel: 60, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'amulet', itemLevel: 75, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'amulet', itemLevel: 50, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'amulet', itemLevel: 75, identified: true, rarity: 'rare'}),
        createStashItem({defaultCategory: 'amulet', itemLevel: 75, identified: false, rarity: 'magic'})
      ]);

      expect(amulet.itemChaosCount).to.equal(1);
      expect(amulet.itemRegalCount).to.equal(1);
      expect(amulet.recipeCount).to.equal(2);
    });

    it('should properly count rings', () => {
      const {ring} = service.build([
        createStashItem({defaultCategory: 'ring', itemLevel: 60, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'ring', itemLevel: 75, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'ring', itemLevel: 50, identified: false, rarity: 'rare'}),
        createStashItem({defaultCategory: 'ring', itemLevel: 75, identified: true, rarity: 'rare'}),
        createStashItem({defaultCategory: 'ring', itemLevel: 75, identified: false, rarity: 'magic'})
      ]);

      expect(ring.itemChaosCount).to.equal(1);
      expect(ring.itemRegalCount).to.equal(1);
      expect(ring.recipeCount).to.equal(1);
    });

    it('should properly count weapons', () => {
      const {hands} = service.build([
        createStashItem({
          defaultCategory: 'weapons',
          subCategories: ['staff'],
          itemLevel: 60,
          identified: false,
          rarity: 'rare'
        }),
        createStashItem({
          defaultCategory: 'weapons',
          subCategories: ['claw'],
          itemLevel: 60,
          identified: false,
          rarity: 'rare'
        }),
        createStashItem({
          defaultCategory: 'weapons',
          subCategories: ['wand'],
          itemLevel: 75,
          identified: false,
          rarity: 'rare'
        }),
        createStashItem({
          defaultCategory: 'weapons',
          subCategories: ['dagger'],
          itemLevel: 50,
          identified: false,
          rarity: 'rare'
        }),
        createStashItem({
          defaultCategory: 'weapons',
          subCategories: ['dagger'],
          itemLevel: 75,
          identified: true,
          rarity: 'rare'
        }),
        createStashItem({
          defaultCategory: 'weapons',
          subCategories: ['dagger'],
          itemLevel: 75,
          identified: false,
          rarity: 'magic'
        })
      ]);

      expect(hands.itemChaosCount).to.equal(2);
      expect(hands.itemRegalCount).to.equal(1);
      expect(hands.recipeCount).to.equal(2);
    });

    it('should summarize the overall state of the recipes', () => {
      const chaosBaseItem = {
        itemLevel: 60,
        identified: false,
        rarity: 'rare'
      };

      const chaosRecipe = service.build([
        createStashItem({...chaosBaseItem, defaultCategory: 'helmet'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'boots'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'boots'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'gloves'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'gloves'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'belt'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'belt'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'chest'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'chest'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'ring'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'ring'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'ring'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'ring'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'amulet'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'amulet'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'amulet'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'amulet'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'amulet'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'amulet'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'amulet'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'amulet'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'amulet'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'amulet'}),
        createStashItem({...chaosBaseItem, defaultCategory: 'weapons', subCategories: ['staff']}),
        createStashItem({...chaosBaseItem, defaultCategory: 'weapons', subCategories: ['staff']})
      ]);

      expect(chaosRecipe.summary.recipeCount).to.equal(1);

      expect(chaosRecipe.helmet.isDanger, 'Helmet danger').to.be.true;
      expect(chaosRecipe.helmet.isWarning, 'Helmet warning').to.be.true;

      expect(chaosRecipe.boots.isDanger, 'Boots danger').to.be.false;
      expect(chaosRecipe.boots.isWarning, 'Boots warning').to.be.true;

      expect(chaosRecipe.gloves.isDanger, 'Gloves danger').to.be.false;
      expect(chaosRecipe.gloves.isWarning, 'Gloves warning').to.be.true;

      expect(chaosRecipe.belt.isDanger, 'Belt danger').to.be.false;
      expect(chaosRecipe.belt.isWarning, 'Belt warning').to.be.true;

      expect(chaosRecipe.chest.isDanger, 'Chest danger').to.be.false;
      expect(chaosRecipe.chest.isWarning, 'Chest warning').to.be.true;

      expect(chaosRecipe.ring.isDanger, 'Ring danger').to.be.false;
      expect(chaosRecipe.ring.isWarning, 'Ring warning').to.be.true;

      expect(chaosRecipe.amulet.isDanger, 'Amulet danger').to.be.false;
      expect(chaosRecipe.amulet.isWarning, 'Amulet warning').to.be.false;

      expect(chaosRecipe.hands.isDanger, 'Hands danger').to.be.false;
      expect(chaosRecipe.hands.isWarning, 'Hands warning').to.be.true;
    });
  });
});
