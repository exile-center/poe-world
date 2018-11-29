// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {computed} from '@ember-decorators/object';
import {bool} from '@ember-decorators/object/computed';

// Constants
import TRADE from 'poe-world/constants/trade';
const TRADE_WEBSITE_OFFSET = 192;

// Models
import Trade from 'poe-world/models/trade';

export default class PageTrade extends Component {
  @service('active-league/setting')
  activeLeagueSetting;

  @service('trade/fetcher')
  tradeFetcher;

  @service('trade/filterer')
  tradeFilterer;

  @service('trade/persister')
  tradePersister;

  @service('trade/destroyer')
  tradeDestroyer;

  tradeWebsiteOffset = TRADE_WEBSITE_OFFSET;
  currentTradeSlug = '';
  currentTrade = null;
  stagedTrade = null;
  trades = null;
  searchValue = '';

  @bool('stagedTrade')
  isEditing;

  @computed('currentTradeSlug', 'currentTrade', 'currentTrade.slug')
  get isTradeSlugDirty() {
    if (!this.currentTrade) return false;

    return this.currentTradeSlug !== this.currentTrade.slug;
  }

  @computed('activeLeagueSetting.league.id')
  get tradeBaseUrl() {
    const activeLeagueId = this.activeLeagueSetting.league.id;
    return `${TRADE.BASE_URL}/${activeLeagueId}`;
  }

  @computed('tradeBaseUrl', 'currentTradeSlug')
  get currentTradeUrl() {
    return `${this.tradeBaseUrl}/${this.currentTradeSlug}`;
  }

  @computed('trades', 'searchValue')
  get filteredTrades() {
    if (!this.searchValue) return this.trades;

    return this.tradeFilterer.filter(this.trades, this.searchValue);
  }

  willInsertElement() {
    this._refreshTrades();

    if (!this.trades.length) return this.create();

    this._makeFirstTradeActive();
  }

  tradeUrlUpdate(newTradeUrl) {
    const matchedSlug = newTradeUrl.match(/trade\/\w+\/\w+\/(\w+)$/);
    if (!matchedSlug) return;

    this.set('currentTradeSlug', matchedSlug[1]);
  }

  view(trade) {
    this.setProperties({
      currentTrade: trade,
      currentTradeSlug: trade.slug
    });
  }

  edit() {
    this.set('stagedTrade', this.currentTrade.clone());
  }

  delete() {
    if (!this.tradeDestroyer.destroy(this.currentTrade)) return;

    this._refreshTrades();
    this._makeFirstTradeActive();
  }

  duplicate() {
    const duplicatedTrade = this.tradePersister.persist(
      this.currentTrade.clone({
        id: null,
        label: `${this.currentTrade.label} *`
      })
    );

    this._refreshTrades();
    this.setProperties({
      currentTrade: duplicatedTrade,
      currentTradeSlug: duplicatedTrade.slug,
      stagedTrade: null
    });
  }

  save() {
    this.stagedTrade.updateProperties({
      slug: this.currentTradeSlug,
      label: this.stagedTrade.label || this.currentTradeSlug
    });
    const savedTrade = this.tradePersister.persist(this.stagedTrade);

    this._refreshTrades();
    this.setProperties({
      currentTrade: savedTrade,
      currentTradeSlug: savedTrade.slug,
      stagedTrade: null
    });
  }

  cancel() {
    this.setProperties({
      stagedTrade: null,
      currentTradeSlug: this.currentTrade.slug
    });
  }

  create() {
    this.setProperties({
      currentTrade: null,
      stagedTrade: Trade.create(),
      currentTradeSlug: ''
    });
  }

  updateTradeSlug() {
    this.currentTrade.updateProperties({slug: this.currentTradeSlug});
    this.tradePersister.persist(this.currentTrade);

    this._refreshTrades();
  }

  revertTradeSlug() {
    this.set('currentTradeSlug', this.currentTrade.slug);
  }

  _refreshTrades() {
    const trades = this.tradeFetcher.fetchAll();

    this.set('trades', trades);
  }

  _makeFirstTradeActive() {
    const currentTrade = this.trades[0];
    this.setProperties({
      currentTrade,
      currentTradeSlug: currentTrade.slug
    });
  }
}
