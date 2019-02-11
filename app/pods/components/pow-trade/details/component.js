// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {argument} from '@ember-decorators/argument';
import {bool} from '@ember-decorators/object/computed';
import {type} from '@ember-decorators/argument/type';
import {action} from '@ember-decorators/object';

export default class TradeDetails extends Component {
  @service('trade/persister')
  tradePersister;

  @service('trade/destroyer')
  tradeDestroyer;

  @argument
  @type('string')
  currentTradeSlug = null;

  @argument
  @type('object')
  trade = null;

  @argument
  @type(Function)
  onDelete;

  @argument
  @type(Function)
  onClose;

  stagedValues = null;

  @bool('stagedValues')
  isEditing;

  didReceiveAttrs() {
    if (this.trade.id) return;
    this._stageValues();
  }

  @action
  initializeEdit() {
    this._stageValues();
  }

  @action
  cancelEdit() {
    if (this.trade.id) return this.set('stagedValues', null);

    this.onDelete();
  }

  @action
  persistEdit() {
    this.trade.updateProperties(this.stagedValues);
    this.tradePersister.persist(this.trade);

    this.set('stagedValues', null);
  }

  @action
  delete() {
    this.tradeDestroyer.destroy(this.trade);
    this.onDelete();
  }

  _stageValues() {
    this.set('stagedValues', this.trade.getProperties('label', 'tags', 'notes'));
  }
}
