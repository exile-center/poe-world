import Pricing from 'poe-world/models/pricing';

export default props => {
  return Pricing.create({
    chaosValue: 2.5,
    exaltedValue: null,
    name: "A Mother's Parting Gift",
    slug: 'a-mothers-parting-gift',

    ...props
  });
};
