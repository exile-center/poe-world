// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {computed} from '@ember-decorators/object';
import {action} from '@ember-decorators/object';
import {tagName} from '@ember-decorators/component';
import {task, timeout} from 'ember-concurrency';

// Models
import Trade from 'poe-world/models/trade';

// Constants
import TRADE from 'poe-world/constants/trade';
const DOUBLE_LOAD_DELAY = 1500; // The site always redirect twice

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
    return [TRADE.BASE_URL, TRADE.DEFAULT_TYPE, this.activeLeagueSetting.league.id].join('/');
  }

  updateTradeUrlTask = task(function*(tradeUrl) {
    yield timeout(DOUBLE_LOAD_DELAY);
    this.set('currentTradeSlug', this._extractSlugFrom(tradeUrl));
  }).restartable();

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
  tradeUrlUpdate(tradeUrl) {
    this.get('updateTradeUrlTask').perform(tradeUrl);
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

  @action
  reloadWebview() {
    if (!this.electronWebview) return;
    this.electronWebview.reload();
  }

  _refreshCurrentTradeUrl() {
    if (!this.electronWebview) return;
    if (!this.currentTrade) return this.electronWebview.navigateTo(this.defaultTradeUrl);

    const {type, slug} = this.currentTrade.urlParts;
    const leagueId = this.activeLeagueSetting.league.id;

    this.electronWebview.navigateTo([TRADE.BASE_URL, type, leagueId, slug].join('/'));
  }

  _extractSlugFrom(tradeUrl) {
    const slugMatcher = tradeUrl.match(/trade\/(\w+)\/\w+\/(\w+)$/);
    if (!slugMatcher) return null;

    return `${slugMatcher[2]}:${slugMatcher[1]}`;
  }
}
