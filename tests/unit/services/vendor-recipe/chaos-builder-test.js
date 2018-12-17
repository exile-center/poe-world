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
        createStashItem({subCategories: ['helmet'], itemLevel: 60, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['helmet'], itemLevel: 75, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['helmet'], itemLevel: 50, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['helmet'], itemLevel: 75, identified: true, rarity: 'rare'}),
        createStashItem({subCategories: ['helmet'], itemLevel: 75, identified: false, rarity: 'magic'})
      ]);

      expect(helmet.itemChaosCount).to.equal(1);
      expect(helmet.itemRegalCount).to.equal(1);
      expect(helmet.recipeCount).to.equal(2);
    });

    it('should properly count boots', () => {
      const {boots} = service.build([
        createStashItem({subCategories: ['boots'], itemLevel: 60, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['boots'], itemLevel: 75, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['boots'], itemLevel: 50, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['boots'], itemLevel: 75, identified: true, rarity: 'rare'}),
        createStashItem({subCategories: ['boots'], itemLevel: 75, identified: false, rarity: 'magic'})
      ]);

      expect(boots.itemChaosCount).to.equal(1);
      expect(boots.itemRegalCount).to.equal(1);
      expect(boots.recipeCount).to.equal(2);
    });

    it('should properly count gloves', () => {
      const {gloves} = service.build([
        createStashItem({subCategories: ['gloves'], itemLevel: 60, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['gloves'], itemLevel: 75, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['gloves'], itemLevel: 50, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['gloves'], itemLevel: 75, identified: true, rarity: 'rare'}),
        createStashItem({subCategories: ['gloves'], itemLevel: 75, identified: false, rarity: 'magic'})
      ]);

      expect(gloves.itemChaosCount).to.equal(1);
      expect(gloves.itemRegalCount).to.equal(1);
      expect(gloves.recipeCount).to.equal(2);
    });

    it('should properly count belts', () => {
      const {belt} = service.build([
        createStashItem({subCategories: ['belt'], itemLevel: 60, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['belt'], itemLevel: 75, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['belt'], itemLevel: 50, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['belt'], itemLevel: 75, identified: true, rarity: 'rare'}),
        createStashItem({subCategories: ['belt'], itemLevel: 75, identified: false, rarity: 'magic'})
      ]);

      expect(belt.itemChaosCount).to.equal(1);
      expect(belt.itemRegalCount).to.equal(1);
      expect(belt.recipeCount).to.equal(2);
    });

    it('should properly count chests', () => {
      const {chest} = service.build([
        createStashItem({subCategories: ['chest'], itemLevel: 60, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['chest'], itemLevel: 75, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['chest'], itemLevel: 50, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['chest'], itemLevel: 75, identified: true, rarity: 'rare'}),
        createStashItem({subCategories: ['chest'], itemLevel: 75, identified: false, rarity: 'magic'})
      ]);

      expect(chest.itemChaosCount).to.equal(1);
      expect(chest.itemRegalCount).to.equal(1);
      expect(chest.recipeCount).to.equal(2);
    });

    it('should properly count amulets', () => {
      const {amulet} = service.build([
        createStashItem({subCategories: ['amulet'], itemLevel: 60, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['amulet'], itemLevel: 75, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['amulet'], itemLevel: 50, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['amulet'], itemLevel: 75, identified: true, rarity: 'rare'}),
        createStashItem({subCategories: ['amulet'], itemLevel: 75, identified: false, rarity: 'magic'})
      ]);

      expect(amulet.itemChaosCount).to.equal(1);
      expect(amulet.itemRegalCount).to.equal(1);
      expect(amulet.recipeCount).to.equal(2);
    });

    it('should properly count rings', () => {
      const {ring} = service.build([
        createStashItem({subCategories: ['ring'], itemLevel: 60, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['ring'], itemLevel: 75, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['ring'], itemLevel: 50, identified: false, rarity: 'rare'}),
        createStashItem({subCategories: ['ring'], itemLevel: 75, identified: true, rarity: 'rare'}),
        createStashItem({subCategories: ['ring'], itemLevel: 75, identified: false, rarity: 'magic'})
      ]);

      expect(ring.itemChaosCount).to.equal(1);
      expect(ring.itemRegalCount).to.equal(1);
      expect(ring.recipeCount).to.equal(1);
    });

    it('should properly count weapons', () => {
      const {hands} = service.build([
        createStashItem({
          subCategories: ['staff'],
          itemLevel: 60,
          identified: false,
          rarity: 'rare'
        }),
        createStashItem({
          subCategories: ['claw'],
          itemLevel: 60,
          identified: false,
          rarity: 'rare'
        }),
        createStashItem({
          subCategories: ['wand'],
          itemLevel: 75,
          identified: false,
          rarity: 'rare'
        }),
        createStashItem({
          subCategories: ['dagger'],
          itemLevel: 50,
          identified: false,
          rarity: 'rare'
        }),
        createStashItem({
          subCategories: ['dagger'],
          itemLevel: 75,
          identified: true,
          rarity: 'rare'
        }),
        createStashItem({
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
        createStashItem({...chaosBaseItem, subCategories: ['helmet']}),
        createStashItem({...chaosBaseItem, subCategories: ['boots']}),
        createStashItem({...chaosBaseItem, subCategories: ['boots']}),
        createStashItem({...chaosBaseItem, subCategories: ['gloves']}),
        createStashItem({...chaosBaseItem, subCategories: ['gloves']}),
        createStashItem({...chaosBaseItem, subCategories: ['belt']}),
        createStashItem({...chaosBaseItem, subCategories: ['belt']}),
        createStashItem({...chaosBaseItem, subCategories: ['chest']}),
        createStashItem({...chaosBaseItem, subCategories: ['chest']}),
        createStashItem({...chaosBaseItem, subCategories: ['ring']}),
        createStashItem({...chaosBaseItem, subCategories: ['ring']}),
        createStashItem({...chaosBaseItem, subCategories: ['ring']}),
        createStashItem({...chaosBaseItem, subCategories: ['ring']}),
        createStashItem({...chaosBaseItem, subCategories: ['amulet']}),
        createStashItem({...chaosBaseItem, subCategories: ['amulet']}),
        createStashItem({...chaosBaseItem, subCategories: ['amulet']}),
        createStashItem({...chaosBaseItem, subCategories: ['amulet']}),
        createStashItem({...chaosBaseItem, subCategories: ['amulet']}),
        createStashItem({...chaosBaseItem, subCategories: ['amulet']}),
        createStashItem({...chaosBaseItem, subCategories: ['amulet']}),
        createStashItem({...chaosBaseItem, subCategories: ['amulet']}),
        createStashItem({...chaosBaseItem, subCategories: ['amulet']}),
        createStashItem({...chaosBaseItem, subCategories: ['amulet']}),
        createStashItem({...chaosBaseItem, subCategories: ['staff']}),
        createStashItem({...chaosBaseItem, subCategories: ['staff']})
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
