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

@tagName('')
export default class PageTrade extends Component {
  @service('intl')
  intl;

  @service('active-league/setting')
  activeLeagueSetting;

  currentTradeSlug = null;
  currentTrade = null;
  electronWebview = null;

  @computed('currentTradeSlug', 'currentTrade')
  get canCreate() {
    return this.currentTradeSlug && !this.currentTrade;
  }

  @computed('activeLeagueSetting.league.id')
  get tradeBaseUrl() {
    const activeLeagueId = this.activeLeagueSetting.league.id;
    return `${TRADE.BASE_URL}/${activeLeagueId}`;
  }

  @action
  electronWebviewReady(electronWebview) {
    this.set('electronWebview', electronWebview);
  }

  @action
  select(trade) {
    this.setProperties({
      currentTrade: trade,
      currentTradeSlug: trade.slug
    });

    this._refreshCurrentTradeUrl();
  }

  @action
  tradeUrlUpdate(newTradeUrl) {
    const slugMatcher = newTradeUrl.match(/trade\/\w+\/\w+\/(\w+)$/);

    this.setProperties({
      currentTradeSlug: slugMatcher ? slugMatcher[1] : null
    });
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

    this._refreshCurrentTradeUrl();
  }

  @action
  clearCurrentTrade() {
    this.set('currentTrade', null);
  }

  @action
  resetCurrentSlug() {
    this.set('currentTradeSlug', this.currentTrade.slug);
    this._refreshCurrentTradeUrl();
  }

  _refreshCurrentTradeUrl() {
    if (!this.electronWebview) return;

    let updatedUrl = this.tradeBaseUrl;
    if (this.currentTradeSlug) updatedUrl += `/${this.currentTradeSlug}`;

    this.electronWebview.navigateTo(updatedUrl);
  }
}
