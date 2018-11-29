// Vendor
import Service from '@ember/service';
import {task, timeout} from 'ember-concurrency';

/* eslint-disable no-magic-numbers */
// Constants
const ATLAS_WIDTH = 4096;
const ATLAS_HEIGHT = 2304;
const SIDE_PANEL_WIDTH = 600;
const MAX_ZOOM = 1;
const MAX_ZOOM_THRESHOLD = 0.99 * MAX_ZOOM;
const MIN_ZOOM = 0.5;
const ZOOM_DURATION = 500;
const MOVE_DURATION = 500;
/* eslint-enable no-magic-numbers */

export default class Reframer extends Service {
  _panzoomRef = null;
  _mapToReframeOnInitialize = null;
  isReframing = false;

  mapReframingTask = task(function*(map) {
    this.set('isReframing', true);

    const viewportCenterX = (window.innerWidth - SIDE_PANEL_WIDTH) / 2;
    const viewportCenterY = window.innerHeight / 2;

    const {x: panLeft, y: panTop, scale: zoom} = this._panzoomRef.getTransform();

    const currentOffset = {
      x: map.offsetLeft * zoom - panLeft * -1,
      y: map.offsetTop * zoom - panTop * -1
    };

    this._panzoomRef.moveBy(viewportCenterX - currentOffset.x, viewportCenterY - currentOffset.y, true);

    yield timeout(MOVE_DURATION);

    if (zoom < MAX_ZOOM_THRESHOLD) {
      this._panzoomRef.smoothZoom(viewportCenterX, viewportCenterY, MAX_ZOOM / zoom);

      yield timeout(ZOOM_DURATION);
    }

    this.set('isReframing', false);
  }).restartable();

  resetZoomTask = task(function*() {
    const {scale: zoom} = this._panzoomRef.getTransform();
    this.set('isReframing', true);

    this._panzoomRef.smoothZoom(window.innerWidth / 2, window.innerHeight / 2, MIN_ZOOM / zoom);

    yield timeout(ZOOM_DURATION);

    this.set('isReframing', false);
  }).restartable();

  initializeFrameTask = task(function*(initialMap) {
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    this._panzoomRef.moveBy(viewportCenterX - ATLAS_WIDTH / 2, viewportCenterY - ATLAS_HEIGHT / 2, false);

    this._panzoomRef.zoomAbs(viewportCenterX, viewportCenterY, MIN_ZOOM);

    if (!initialMap) return;

    yield timeout(ZOOM_DURATION);

    yield this.get('mapReframingTask').perform(initialMap);
  }).restartable();

  initialize(panzoomRef) {
    this._panzoomRef = panzoomRef;

    this.get('initializeFrameTask').perform(this._mapToReframeOnInitialize);
  }

  reframeFor(map) {
    if (!this._panzoomRef) return (this._mapToReframeOnInitialize = map);

    this.get('mapReframingTask').perform(map);
  }

  resetMapZoom() {
    if (!this._panzoomRef) return;

    this.get('resetZoomTask').perform();
  }
}
