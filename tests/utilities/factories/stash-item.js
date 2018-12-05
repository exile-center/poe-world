import StashItem from 'poe-world/models/stash-item';

export default props => {
  return StashItem.create({
    explicitMods: [],
    identified: true,
    imageUrl: 'https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Laboratory.png',
    itemLevel: 79,
    maxStackSize: null,
    name: 'Laboratory Map',
    quantity: 1,
    rarity: 'normal',
    slug: 'laboratory-map',
    socketCount: 0,
    socketGroups: [],
    subCategories: [],
    topCategory: 'maps',

    ...props
  });
};
