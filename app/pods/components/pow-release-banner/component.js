// Vendor
import Component from '@ember/component';
import ENV from 'poe-world/config/environment';
import {service} from '@ember-decorators/service';
import {restartableTask} from 'ember-concurrency-decorators';

// Constants
const {
  APP: {VERSION: CURRENT_VERSION}
} = ENV;

export default class Component extends Component {
  @service('releases/fetcher')
  releasesFetcher;

  isOutdated = null;
  latestRelease = null;

  @restartableTask
  fetchLatestReleaseTask = function*() {
    const latestRelease = yield this.releasesFetcher.fetchLatest();

    this.setProperties({
      latestRelease,
      currentVersion: CURRENT_VERSION,
      isOutdated: CURRENT_VERSION < latestRelease.version
    });
  };

  willInsertElement() {
    this.fetchLatestReleaseTask.perform();
  }
}
