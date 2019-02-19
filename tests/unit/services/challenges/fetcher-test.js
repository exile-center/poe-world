// Vendor
import {expect} from 'chai';
import {describe, beforeEach, afterEach, it} from 'mocha';
import {setupTest} from 'ember-mocha';
import sinon from 'sinon';

describe('Unit | Services | Challenges | Fetcher', () => {
  setupTest();

  let service;
  let electronRequestMock;

  beforeEach(function() {
    service = this.owner.lookup('service:challenges/fetcher');
    electronRequestMock = sinon.mock(service.electronRequest);
    sinon.stub(service.activeLeagueSetting, 'league').value({id: 'fake-league'});
    sinon.stub(service.authenticationSetting, 'account').value('fake-account');
  });

  afterEach(() => {
    electronRequestMock.verify();
  });

  describe('fetch', () => {
    it('should be able to parse single boolean challenge', async () => {
      electronRequestMock
        .expects('privateFetch')
        .withArgs('https://www.pathofexile.com/account/view-profile/fake-account/challenges/fake-league')
        .once()
        .returns(
          Promise.resolve(
            '<div><div class="achievement-list"><div class="achievement clearfix"><a class="btn-detail"></a><h2>Complete Zana Questline   </h2><div class="detail"><span class="text">Complete the entire questline given by Zana.</span></div><img class="completion" src="https://web.poecdn.com/image/Art/2DArt/UIImages/InGame/Tick.png?hash=1f20be360c2bcbcdafcd6a783ed7a944"></div></div></div>'
          )
        );

      const [challenge] = await service.fetch();

      expect(challenge.name).to.equal('Complete Zana Questline');
      expect(challenge.description).to.equal('Complete the entire questline given by Zana.');
      expect(challenge.completed).to.be.true;
      expect(challenge.subChallenges.length).to.equal(0);
    });

    it('should be able to parse single progressive challenge', async () => {
      electronRequestMock
        .expects('privateFetch')
        .withArgs('https://www.pathofexile.com/account/view-profile/fake-account/challenges/fake-league')
        .once()
        .returns(
          Promise.resolve(
            '<div><div class="achievement-list"><div class="achievement clearfix incomplete"><a class="btn-detail"></a><h2>Complete Atlas Objectives</h2><h2 class="completion-detail"><span class=" completion-incomplete">168</span>/400</h2><div class="detail"><span class="text">Complete 400 Atlas Objectives.</span></div><img class="completion" src="https://web.poecdn.com/image/Art/2DArt/UIImages/InGame/Cross.png?hash=edf6a81e4c9ce92681d0ca95b757bb27"></div></div></div>'
          )
        );

      const [challenge] = await service.fetch();

      expect(challenge.name).to.equal('Complete Atlas Objectives');
      expect(challenge.description).to.equal('Complete 400 Atlas Objectives.');
      expect(challenge.completed).to.be.false;
      expect(challenge.completion).to.equal(168);
      expect(challenge.treshold).to.equal(400);
    });

    it('should be able to parse challenge with sub-challenges', async () => {
      electronRequestMock
        .expects('privateFetch')
        .withArgs('https://www.pathofexile.com/account/view-profile/fake-account/challenges/fake-league')
        .once()
        .returns(
          Promise.resolve(
            '<div><div class="achievement-list"><div class="achievement clearfix incomplete"><a class="btn-detail expanded"></a><h2>Complete Endgame Grinds</h2><h2 class="completion-detail"><span class=" completion-incomplete">0</span>/4</h2><div class="detail" style="display: block;"><span class="text">Complete any 4 of these encounters the specified number of times.</span><br><br><span class="items"><ul><li class="">Reach Level 100</li><li class="">Reach Depth Level 600 in your Azurite Mine</li><li class="finished">Open Chests at the end of the Endgame Labyrinth (500/500)</li><li class="">Defeat the Vaal Omnitect in an area of Level 75 or higher (25/60)</li><li class="">Defeat any Bestiary Bosses (5/40)</li><li class="">Complete your Syndicate Safehouses (46/100)</li></ul></span></div><img class="completion" src="https://web.poecdn.com/image/Art/2DArt/UIImages/InGame/Cross.png?hash=edf6a81e4c9ce92681d0ca95b757bb27"></div></div></div>'
          )
        );

      const [challenge] = await service.fetch();

      expect(challenge.name).to.equal('Complete Endgame Grinds');
      expect(challenge.description).to.equal('Complete any 4 of these encounters the specified number of times.');
      expect(challenge.completed).to.be.false;
      expect(challenge.completion).to.equal(0);
      expect(challenge.treshold).to.equal(4);

      const [levelSubChallenge, _, uberLabSubChallenge] = challenge.subChallenges;

      expect(levelSubChallenge.description).to.equal('Reach Level 100');
      expect(levelSubChallenge.completed).to.be.false;

      expect(uberLabSubChallenge.description).to.equal('Open Chests at the end of the Endgame Labyrinth');
      expect(uberLabSubChallenge.completed).to.be.true;
      expect(uberLabSubChallenge.completion).to.equal(500);
      expect(uberLabSubChallenge.treshold).to.equal(500);
    });
  });
});
