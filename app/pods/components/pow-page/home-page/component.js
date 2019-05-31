// Vendor
import Component from '@ember/component';

// Constants
import LINKS from 'poe-world/constants/links';

export default class PageHome extends Component {
  releasesUrl = LINKS.RELEASES_URL;
  issuesUrl = LINKS.ISSUES_URL;
  discordUrl = LINKS.DISCORD_URL;
  githubUrl = LINKS.GITHUB_URL;
}
