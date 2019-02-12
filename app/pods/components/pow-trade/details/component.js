// Vendor
import Component from '@ember/component';
import {service} from '@ember-decorators/service';
import {argument} from '@ember-decorators/argument';
import {bool, not} from '@ember-decorators/object/computed';
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
  onClose;

  stagedValues = null;

  @bool('stagedValues')
  isEditing;

  @not('trade.label')
  cantSave;

  @not('trade.id')
  isNew;

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
    this.set('stagedValues', null);
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
    this.onClose();
  }

  _stageValues() {
    this.set('stagedValues', this.trade.getProperties('label', 'tags', 'notes'));
  }
}
