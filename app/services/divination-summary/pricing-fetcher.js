// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';
import moment from 'moment';
import Pricing from 'poe-world/models/pricing';
import POE_NINJA from 'poe-world/constants/poe-ninja';
import slugify from 'poe-world/utilities/slugify';

export default class PricingFetcher extends Service {
  @service('-electron/request')
  electronRequest;

  @service('active-league/setting')
  activeLeagueSetting;

  _divinationPricingPromise = null;
  _pricingDate = null;

  fetch() {
    const currentPricingDate = moment().format('YYYY-MM-DD');

    if (this._divinationPricingPromise && this._pricingDate === currentPricingDate) {
      return this._divinationPricingPromise;
    }

    const poeNinjaDivinationUrl = this._buildDivinationPricingUrlFor(currentPricingDate);
    const divinationPricingPromise = this.electronRequest.fetch(poeNinjaDivinationUrl).then(({lines}) => {
      return lines.reduce((divinationPricingMap, rawPricing) => {
        const slug = slugify(rawPricing.name);

        divinationPricingMap[slug] = Pricing.create({
          name: rawPricing.name,
          slug,
          chaosValue: rawPricing.chaosValue
        });

        return divinationPricingMap;
      }, {});
    });

    this.setProperties({
      _divinationPricingPromise: divinationPricingPromise,
      _pricingDate: currentPricingDate
    });

    return divinationPricingPromise;
  }

  _buildDivinationPricingUrlFor(pricingDate) {
    const params = [
      `league=${this.activeLeagueSetting.league.name}`,
      `type=${POE_NINJA.ITEM_TYPE_DIVINATION}`,
      `date=${pricingDate}`
    ];

    return `${POE_NINJA.API_BASE_URL}/itemoverview?${params.join('&')}`;
  }
}
