// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {computed} from '@ember-decorators/object';
import {action} from '@ember-decorators/object';
import {tagName} from '@ember-decorators/component';

// Models
import Trade from 'poe-world/models/trade';

// Constants
import TRADE from 'poe-world/constants/trade';
const TRADE_WEBSITE_OFFSET = 192;

@tagName('')
export default class PageTrade extends Component {
  @service('intl')
  intl;

  @service('active-league/setting')
  activeLeagueSetting;

  tradeWebsiteOffset = TRADE_WEBSITE_OFFSET;
  currentTradeSlug = null;
  currentTrade = null;

  @computed('currentTradeSlug', 'currentTrade')
  get canCreate() {
    return this.currentTradeSlug && !this.currentTrade;
  }

  @computed('activeLeagueSetting.league.id')
  get tradeBaseUrl() {
    const activeLeagueId = this.activeLeagueSetting.league.id;
    return `${TRADE.BASE_URL}/${activeLeagueId}`;
  }

  @computed('tradeBaseUrl', 'currentTradeSlug')
  get currentTradeUrl() {
    if (!this.currentTradeSlug) return this.tradeBaseUrl;

    return `${this.tradeBaseUrl}/${this.currentTradeSlug}`;
  }

  @action
  select(trade) {
    this.setProperties({
      currentTrade: trade,
      currentTradeSlug: trade.slug
    });
  }

  @action
  tradeUrlUpdate(newTradeUrl) {
    const matchedSlug = newTradeUrl.match(/trade\/\w+\/\w+\/(\w+)$/);
    if (!matchedSlug) return;

    this.set('currentTradeSlug', matchedSlug[1]);
  }

  @action
  create() {
    const trade = Trade.create({
      slug: this.currentTradeSlug
    });

    this.set('currentTrade', trade);
  }

  @action
  clearAll() {
    this.setProperties({
      currentTradeSlug: null,
      currentTrade: null
    });
  }

  @action
  clearCurrentTrade() {
    this.set('currentTrade', null);
  }
}
