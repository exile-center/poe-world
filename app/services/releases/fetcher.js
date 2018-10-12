import Service, {inject as service} from '@ember/service';
import Release from 'poe-world/models/release';
import ENV from 'poe-world/config/environment';
import GITHUB_API from 'poe-world/constants/github-api';

// Constants
const {APP: {GITHUB_HANDLE}} = ENV;
const WINDOWS_ASSET_CONTENT_TYPE = 'application/x-msdownload';

export default Service.extend({
  request: service('request'),

  fetchLatest() {
    return this.request.fetch(`${GITHUB_API.BASE_URL}/repos/${GITHUB_HANDLE}/releases/latest`).then((rawRelease) => {
      const windowsAsset = rawRelease.assets.find((asset) => asset.content_type === WINDOWS_ASSET_CONTENT_TYPE);

      return Release.create({
        version: rawRelease.tag_name,
        publishedAt: rawRelease.published_at,
        githubReleaseUrl: rawRelease.html_url,
        windowsDownloadUrl: windowsAsset ? windowsAsset.browser_download_url : null,
        changelog: rawRelease.body
      });
    });
  }
});
