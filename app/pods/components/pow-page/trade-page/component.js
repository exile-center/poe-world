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

  @computed
  get defaultTradeUrl() {
    return `${TRADE.BASE_URL}/${TRADE.DEFAULT_TYPE}`;
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
    this.set('currentTradeSlug', this._extractSlugFrom(newTradeUrl));
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
    if (!this.currentTrade) return this.electronWebview.navigateTo(this.defaultTradeUrl);

    const {type, slug} = this.currentTrade.urlParts;

    const urlParts = [TRADE.BASE_URL];
    urlParts.push(type);
    urlParts.push(this.activeLeagueSetting.league.id);
    urlParts.push(slug);

    this.electronWebview.navigateTo(urlParts.join('/'));
  }

  _extractSlugFrom(tradeUrl) {
    const slugMatcher = tradeUrl.match(/trade\/(\w+)\/\w+\/(\w+)$/);
    if (!slugMatcher) return null;

    return `${slugMatcher[2]}:${slugMatcher[1]}`;
  }
}
