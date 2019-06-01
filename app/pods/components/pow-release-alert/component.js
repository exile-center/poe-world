// Vendor
import Component from '@ember/component';
import ENV from 'poe-world/config/environment';
import {service} from '@ember-decorators/service';
import {task} from 'ember-concurrency';

// Constants
const {
  APP: {VERSION: CURRENT_VERSION}
} = ENV;

export default class ReleaseAlert extends Component {
  @service('releases/fetcher')
  releasesFetcher;

  isOutdated = false;
  latestRelease = null;

  fetchLatestReleaseTask = task(function*() {
    const latestRelease = yield this.releasesFetcher.fetchLatest();

    this.setProperties({
      latestRelease,
      currentVersion: CURRENT_VERSION,
      isOutdated: CURRENT_VERSION < latestRelease.version
    });
  }).drop();

  willInsertElement() {
    this.get('fetchLatestReleaseTask').perform();
  }
}
