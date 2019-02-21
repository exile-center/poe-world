// Vendor
import {expect} from 'chai';
import {describe, beforeEach, afterEach, it} from 'mocha';
import {setupTest} from 'ember-mocha';
import sinon from 'sinon';

// Models
import League from 'poe-world/models/league';

describe('Unit | Models | League', () => {
  setupTest();

  let fakeTimer;

  describe('Computed properties', () => {
    describe('slug', () => {
      it('should compute a slug from the name', () => {
        const league = League.create({id: 'Betrayal'});

        expect(league.get('slug')).to.equal('betrayal');
      });
    });

    describe('progress', () => {
      beforeEach(() => {
        fakeTimer = sinon.useFakeTimers(1546318800000); // Jan 01 2019
      });

      afterEach(() => {
        fakeTimer.restore();
      });

      it('should compute the league progress from current time', () => {
        const league = League.create({
          startAt: '2018-12-07T19:00:00Z',
          endAt: '2019-03-04T21:00:00Z'
        });

        expect(league.get('progress')).to.equal(0.28);
      });
    });
  });
});
