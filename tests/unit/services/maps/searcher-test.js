// Vendor
import {expect} from 'chai';
import {describe, beforeEach, it} from 'mocha';
import {setupTest} from 'ember-mocha';

// Factories
import createMap from 'poe-world/tests/utilities/factories/map';

describe('Unit | Services | Maps | Searcher', () => {
  setupTest();

  let service;
  let maps;

  beforeEach(function() {
    service = this.owner.lookup('service:maps/searcher');

    maps = [
      createMap({
        id: 'reef',
        name: 'Reef',
        tier: 14,
        areaLevel: 74,
        pantheon: null,
        layoutRating: 'A',
        bossRating: 2,
        drops: []
      }),
      createMap({
        id: 'beach',
        name: 'Beach',
        tier: 2,
        areaLevel: 60,
        pantheon: {god: 'JohnCena'},
        layoutRating: 'B',
        bossRating: 4,
        drops: []
      }),
      createMap({
        id: 'maze',
        name: 'Maze',
        tier: 8,
        areaLevel: 67,
        pantheon: null,
        layoutRating: 'C',
        bossRating: 5,
        drops: []
      }),
      createMap({
        id: 'yolo',
        name: 'Yolo',
        tier: 5,
        layoutRating: 'B',
        bossRating: 4,
        drops: [{name: 'headhunter', wikiUrl: 'http://fakewiki.com/hh'}]
      })
    ];
  });

  describe('search', () => {
    describe('with an empty query', () => {
      it('should return an empty list', () => {
        const results = service.search(maps, '');
        expect(results).to.have.lengthOf(0);
      });
    });

    describe('by name', () => {
      it('should be able to match the name with a substring', () => {
        const results = service.search(maps, 'bea');

        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.equal('beach');
      });
    });

    describe('by tier', () => {
      it('should support the `=` operator', () => {
        const results = service.search(maps, 'tier=14');

        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.equal('reef');
      });

      it('should support the `>` operator', () => {
        const results = service.search(maps, 'tier>13');

        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.equal('reef');
      });

      it('should support the `<` operator', () => {
        const results = service.search(maps, 'tier<3');

        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.equal('beach');
      });
    });

    describe('by area level', () => {
      it('should support the `=` operator', () => {
        const results = service.search(maps, 'alvl=74');

        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.equal('reef');
      });

      it('should support the `>` operator', () => {
        const results = service.search(maps, 'alvl>70');

        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.equal('reef');
      });

      it('should support the `<` operator', () => {
        const results = service.search(maps, 'alvl<62');

        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.equal('beach');
      });
    });

    describe('by pantheon', () => {
      it('should support the `=` operator to match a substring', () => {
        const results = service.search(maps, 'pantheon=john');

        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.equal('beach');
      });
    });

    describe('by color', () => {
      it('should support the `=` operator', () => {
        const results = service.search(maps, 'color=red');

        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.equal('reef');
      });
    });

    describe('by layout rating', () => {
      it('should support the `=` operator', () => {
        const results = service.search(maps, 'layout=a');

        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.equal('reef');
      });

      it('should support the `>` operator', () => {
        const results = service.search(maps, 'layout>b');

        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.equal('reef');
      });

      it('should support the `<` operator', () => {
        const results = service.search(maps, 'layout<b');

        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.equal('maze');
      });
    });

    describe('by boss rating', () => {
      it('should support the `=` operator', () => {
        const results = service.search(maps, 'boss=5');

        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.equal('maze');
      });

      it('should support the `>` operator', () => {
        const results = service.search(maps, 'boss>4');

        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.equal('maze');
      });

      it('should support the `<` operator', () => {
        const results = service.search(maps, 'boss<3');

        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.equal('reef');
      });
    });

    describe('by drop', () => {
      it('should support the `=` to find a matching item', () => {
        const results = service.search(maps, 'drop=head');

        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.equal('yolo');
      });
    });

    describe('with combos', () => {
      it('should consider the `;` like a `&&`', () => {
        const results = service.search(maps, 'layout>C;boss<3');

        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.equal('reef');
      });
    });

    describe('with spaces in the query', () => {
      it('should ignores the trailing spaces', () => {
        const results = service.search(maps, 'layout > C; boss < 3');

        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.equal('reef');
      });
    });
  });
});
