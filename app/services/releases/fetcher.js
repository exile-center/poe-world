// Vendor
import Service from '@ember/service';
import {service} from '@ember-decorators/service';
import ENV from 'poe-world/config/environment';
import GITHUB_API from 'poe-world/constants/github-api';

// Constants
const {
  APP: {GITHUB_HANDLE}
} = ENV;

export default class Fetcher extends Service {
  @service('request')
  request;

  fetchLatest() {
    return this.request.fetch(`${GITHUB_API.BASE_URL}/repos/${GITHUB_HANDLE}/releases/latest`).then(rawRelease => ({
      version: rawRelease.tag_name,
      githubReleaseUrl: rawRelease.html_url
    }));
  }
}
