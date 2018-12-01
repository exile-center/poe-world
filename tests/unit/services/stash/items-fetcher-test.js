// Vendor
import {expect} from 'chai';
import {describe, beforeEach, afterEach, it} from 'mocha';
import {setupTest} from 'ember-mocha';
import sinon from 'sinon';

describe('Unit | Services | Stash | Items fetcher', () => {
  setupTest();

  let service;
  let electronRequestMock;

  beforeEach(function() {
    service = this.owner.lookup('service:stash/items-fetcher');
    electronRequestMock = sinon.mock(service.electronRequest);
    sinon.stub(service.activeLeagueSetting, 'league').value({id: 'fake-league'});
    sinon.stub(service.authenticationSetting, 'account').value('fake-account');
  });

  afterEach(() => {
    electronRequestMock.verify();
  });

  describe('fetchFromStashIndex', () => {
    it('should be able to parse the `pathofexile.com` format into the `StashItem` model', async () => {
      electronRequestMock
        .expects('privateFetch')
        .withArgs(
          'https://www.pathofexile.com/character-window/get-stash-items?accountName=fake-account&league=fake-league&tabIndex=fake-index'
        )
        .once()
        .returns(
          Promise.resolve({
            items: [
              {
                verified: false,
                w: 2,
                h: 2,
                ilvl: 85,
                icon: 'http://fake-poe.com/image',
                league: 'Fake League',
                id: '9bc698cacfcd027f4546119acadeb6f1e8059fbcf15d0d25cc793421c20248c6',
                shaper: true,
                sockets: [{group: 0, attr: 'I', sColour: 'B'}, {group: 0, attr: 'S', sColour: 'R'}],
                name: 'Blight Bane',
                typeLine: 'Eagle Claw',
                identified: true,
                properties: [
                  {name: 'Claw', values: [], displayMode: 0},
                  {name: 'Physical Damage', values: [['35-142', 1]], displayMode: 0, type: 9},
                  {name: 'Elemental Damage', values: [['9-112', 6]], displayMode: 0, type: 10},
                  {name: 'Critical Strike Chance', values: [['6.30%', 0]], displayMode: 0, type: 12},
                  {name: 'Attacks per Second', values: [['1.75', 1]], displayMode: 0, type: 13},
                  {name: 'Weapon Range', values: [['9', 0]], displayMode: 0, type: 14}
                ],
                requirements: [
                  {name: 'Level', values: [['55', 0]], displayMode: 0},
                  {name: 'Dex', values: [['94', 0]], displayMode: 1},
                  {name: 'Int', values: [['94', 0]], displayMode: 1}
                ],
                implicitMods: ['2% of Physical Attack Damage Leeched as Life'],
                explicitMods: [
                  '106% increased Physical Damage',
                  'Adds 9 to 112 Lightning Damage',
                  '17% increased Attack Speed',
                  '+2 Mana gained on Kill',
                  'Gain 17% of Physical Damage as Extra Cold Damage'
                ],
                frameType: 2,
                category: {weapons: ['claw']},
                x: 8,
                y: 6,
                inventoryId: 'Stash4',
                socketedItems: []
              }
            ]
          })
        );

      const [item] = await service.fetchFromStashIndex('fake-index');

      expect(item.name).to.equal('Eagle Claw');
      expect(item.slug).to.equal('eagle-claw');
      expect(item.imageUrl).to.equal('http://fake-poe.com/image');
      expect(item.itemLevel).to.equal(85);
      expect(item.quantity).to.equal(1);
      expect(item.maxStackSize).to.be.null;
      expect(item.topCategory).to.equal('weapons');
      expect(item.subCategories).to.have.members(['claw']);
      expect(item.rarity).to.equal('rare');
      expect(item.identified).to.be.true;
      expect(item.socketCount).to.equal(2);
      expect(item.socketGroups).to.have.members(['BR']);
      expect(item.explicitMods).to.have.members([
        '106% increased Physical Damage',
        'Adds 9 to 112 Lightning Damage',
        '17% increased Attack Speed',
        '+2 Mana gained on Kill',
        'Gain 17% of Physical Damage as Extra Cold Damage'
      ]);
    });
  });
});
