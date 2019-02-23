// Vendor
import {expect} from 'chai';
import {describe, it} from 'mocha';
import {setupTest} from 'ember-mocha';

// Models
import Challenge from 'poe-world/models/challenge';

describe('Unit | Models | Challenge', () => {
  setupTest();

  describe('Computed properties', () => {
    describe('slug', () => {
      it('should compute a slug from the name', () => {
        const challenge = Challenge.create({name: 'Complete Endgame Grinds'});

        expect(challenge.get('slug')).to.equal('complete-endgame-grinds');
      });
    });

    describe('progress', () => {
      it('should be able to handle single objective', () => {
        const challenge = Challenge.create({
          completed: true
        });

        expect(challenge.progress).to.equal(1);
      });

      it('should be able to handle progressive objective', () => {
        const challenge = Challenge.create({
          completed: false,
          subChallenges: [],
          completion: 200,
          treshold: 400
        });

        expect(challenge.progress).to.equal(0.5);
      });

      it('should be able to handle multiple sub-challenges', () => {
        const challenge = Challenge.create({
          completed: false,
          treshold: 2,
          subChallenges: [
            Challenge.create({name: 'second', subChallenges: [], completion: 2, treshold: 4}),
            Challenge.create({name: 'third', subChallenges: [], completion: 1, treshold: 4}),
            Challenge.create({name: 'first', subChallenges: [], completed: true})
          ]
        });

        expect(challenge.progress).to.equal(0.75);
      });
    });

    describe('sortedSubChallenges', () => {
      it('should return sub-challenges sorted by progress', () => {
        const challenge = Challenge.create({
          subChallenges: [
            Challenge.create({name: 'second', subChallenges: [], completion: 3, treshold: 4}),
            Challenge.create({name: 'third', subChallenges: [], completion: 2, treshold: 4}),
            Challenge.create({name: 'first', subChallenges: [], completed: true})
          ]
        });

        expect(challenge.sortedSubChallenges[0].name).to.equal('first');
        expect(challenge.sortedSubChallenges[1].name).to.equal('second');
        expect(challenge.sortedSubChallenges[2].name).to.equal('third');
      });
    });

    describe('mostAdvancedSubChallenges', () => {
      it('should return the most advanced sub challenges', () => {
        const challenge = Challenge.create({
          treshold: 2,
          subChallenges: [
            Challenge.create({name: 'second', subChallenges: [], completion: 3, treshold: 4}),
            Challenge.create({name: 'third', subChallenges: [], completion: 2, treshold: 4}),
            Challenge.create({name: 'first', subChallenges: [], completed: true})
          ]
        });

        expect(challenge.mostAdvancedSubChallenges.length).to.equal(2);
        expect(challenge.mostAdvancedSubChallenges[0].name).to.equal('first');
        expect(challenge.mostAdvancedSubChallenges[1].name).to.equal('second');
      });
    });

    describe('leastAdvancedSubChallenges', () => {
      it('should return the least advanced sub challenges', () => {
        const challenge = Challenge.create({
          treshold: 2,
          subChallenges: [
            Challenge.create({name: 'second', subChallenges: [], completion: 3, treshold: 4}),
            Challenge.create({name: 'third', subChallenges: [], completion: 2, treshold: 4}),
            Challenge.create({name: 'first', subChallenges: [], completed: true})
          ]
        });

        expect(challenge.leastAdvancedSubChallenges.length).to.equal(1);
        expect(challenge.leastAdvancedSubChallenges[0].name).to.equal('third');
      });
    });
  });
});
