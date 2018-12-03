import Map from 'poe-world/models/atlas-map';

export default props => {
  return Map.create({
    id: 'beach',
    name: 'Beach',
    wikiUrl: 'https://pathofexile.gamepedia.com/Beach_Map_(War_for_the_Atlas)',
    areaLevel: 68,
    tier: 1,
    type: 'normal',
    layoutRating: 'A',
    bossRating: '2',
    tileset: 'The Beacon (1st half)',
    imageUrl: 'http://fake-wiki.com/beach.png',
    drops: [
      {
        name: 'Hope',
        wikiUrl: 'https://pathofexile.gamepedia.com/Hope'
      },
      {
        name: 'The Gambler',
        wikiUrl: 'https://pathofexile.gamepedia.com/The_Gambler'
      },
      {
        name: 'Her Mask',
        wikiUrl: 'https://pathofexile.gamepedia.com/Her_Mask'
      }
    ],
    fragments: [],
    isTradable: true,
    pantheon: null,
    offsetLeft: 3421,
    offsetTop: 391,
    sextants: ['beach', 'desert'],

    ...props
  });
};
