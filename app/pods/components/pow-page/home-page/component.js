// Vendor
import Component from '@ember/component';

// Constants
import EXTERNAL_LINKS from 'poe-world/constants/external-links';
import LINKS from 'poe-world/constants/links';

export default class PageHome extends Component {
  externalLinks = EXTERNAL_LINKS;
  releasesUrl = LINKS.RELEASES_URL;
  issuesUrl = LINKS.ISSUES_URL;
  discordUrl = LINKS.DISCORD_URL;
  githubUrl = LINKS.GITHUB_URL;
}
