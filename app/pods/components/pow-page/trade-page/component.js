// Vendors
import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {computed} from '@ember/object';
import {bool} from '@ember/object/computed';
import moment from 'moment';

// Constants
import TRADE from 'poe-world/constants/trade';
const TRADE_WEBSITE_OFFSET = 192;

export default Component.extend({
  activeLeagueSetting: service('active-league/setting'),
  tradeFetcher: service('trade/fetcher'),
  tradePersister: service('trade/persister'),

  tradeWebsiteOffset: TRADE_WEBSITE_OFFSET,

  currentTradeSlug: '',
  currentTrade: null,
  stagedTrade: null,
  trades: [],

  isEditing: bool('stagedTrade'),

  isTradeSlugDirty: computed('currentTradeSlug', 'currentTrade', 'currentTrade.slug', function() {
    if (!this.currentTrade) return false;

    return this.currentTradeSlug !== this.currentTrade.slug;
  }),

  tradeBaseUrl: computed('activeLeagueSetting.league.id', function() {
    const activeLeagueId = this.activeLeagueSetting.league.id;
    return `${TRADE.BASE_URL}/${activeLeagueId}`;
  }),

  currentTradeUrl: computed('tradeBaseUrl', 'currentTradeSlug', function() {
    return `${this.tradeBaseUrl}/${this.currentTradeSlug}`;
  }),

  willInsertElement() {
    this._refreshTrades();

    if (!this.trades.length) return this.create();

    const currentTrade = this.trades[0];
    this.setProperties({
      currentTrade,
      currentTradeSlug: currentTrade.slug
    });
  },

  tradeUrlUpdate(newTradeUrl) {
    const matchedSlug = newTradeUrl.match(/trade\/\w+\/\w+\/(\w+)$/);
    if (!matchedSlug) return;

    this.set('currentTradeSlug', matchedSlug[1]);
  },

  view(trade) {
    this.setProperties({
      currentTrade: trade,
      currentTradeSlug: trade.slug
    });
  },

  edit() {
    this.set('stagedTrade', {
      ...this.currentTrade
    });
  },

  save() {
    this.set('stagedTrade.slug', this.currentTradeSlug);
    this.set('stagedTrade.updatedAt', moment().toISOString());
    if (!this.stagedTrade.label) this.set('stagedTrade.label', this.currentTradeSlug);

    const savedTrade = this.tradePersister.persist(this.stagedTrade);

    this._refreshTrades();
    this.setProperties({
      currentTrade: savedTrade,
      stagedTrade: null
    });
  },

  cancel() {
    this.setProperties({
      stagedTrade: null,
      currentTradeSlug: this.currentTrade.slug
    });
  },

  create() {
    this.setProperties({
      currentTrade: null,
      stagedTrade: {
        label: '',
        notes: '',
        slug: '',
        updatedAt: null
      },
      currentTradeSlug: ''
    });
  },

  updateTradeSlug() {
    this.set('currentTrade.slug', this.currentTradeSlug);
    this.set('currentTrade.updatedAt', moment().toISOString());
    this.tradePersister.persist(this.currentTrade);

    this._refreshTrades();
  },

  revertTradeSlug() {
    this.set('currentTradeSlug', this.currentTrade.slug);
  },

  _refreshTrades() {
    const trades = this.tradeFetcher.fetchAll();

    this.set('trades', trades);
  }
});
