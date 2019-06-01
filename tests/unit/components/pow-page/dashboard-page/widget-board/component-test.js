// Vendor
import {expect} from 'chai';
import {describe, beforeEach, it} from 'mocha';
import {setupTest} from 'ember-mocha';
import sinon from 'sinon';
import {A as emberArray} from '@ember/array';

// Factories
import createDashboardWidget from 'poe-world/tests/utilities/factories/dashboard-widget';

describe('Unit | Components | pow-page/dashboards-page/widget-board', () => {
  setupTest();

  let component;

  beforeEach(function() {
    component = this.owner.factoryFor('component:pow-page/dashboards-page/widget-board').create({
      widgets: null,
      widgetsAreLocked: false,
      addWidget: sinon.spy(),
      updateWidget: sinon.spy(),
      deleteWidget: sinon.spy()
    });
  });

  describe('computed properties', () => {
    describe('widgetsGrid', () => {
      describe('with widgets', () => {
        beforeEach(() => {
          component.set(
            'widgets',
            emberArray([
              createDashboardWidget({column: 1, row: 1}),
              createDashboardWidget({column: 1, row: 0}),
              createDashboardWidget({column: 0, row: 0}),
              createDashboardWidget({column: 0, row: 1})
            ])
          );
        });

        it('should return the properly sorted grid', () => {
          const widgetsGrid = component.widgetsGrid;

          // First column
          expect(widgetsGrid.firstObject.firstObject.column).to.equal(0);
          expect(widgetsGrid.firstObject.firstObject.row).to.equal(0);
          expect(widgetsGrid.firstObject.lastObject.column).to.equal(0);
          expect(widgetsGrid.firstObject.lastObject.row).to.equal(1);

          // Second column
          expect(widgetsGrid.lastObject.firstObject.column).to.equal(1);
          expect(widgetsGrid.lastObject.firstObject.row).to.equal(0);
          expect(widgetsGrid.lastObject.lastObject.column).to.equal(1);
          expect(widgetsGrid.lastObject.lastObject.row).to.equal(1);
        });
      });

      describe('without widget', () => {
        beforeEach(() => {
          component.set('widgets', emberArray([]));
        });

        it('should return an empty grid', () => {
          const widgetsGrid = component.widgetsGrid;

          expect(widgetsGrid.length).to.equal(1, 'It should have one column');
          expect(widgetsGrid.firstObject.length).to.be.equal(0, 'The first column should be empty');
        });
      });
    });
  });
});
