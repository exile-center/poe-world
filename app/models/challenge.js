// Vendor
import EmberObject from '@ember/object';
import {computed} from '@ember-decorators/object';
import {sort} from '@ember-decorators/object/computed';

// Utilities
import slugify from 'poe-world/utilities/slugify';

export default class Challenge extends EmberObject {
  name = null;
  description = null;
  subChallenges = null;
  completed = null;
  completion = null;
  treshold = null;

  constructor(props) {
    super(props);
    this.setProperties(props);
  }

  @computed('name')
  get slug() {
    return slugify(this.name);
  }

  @computed('completion', 'treshold', 'completed', 'mostAdvancedSubChallenges')
  get progress() {
    if (this.completed) return 1;

    let progress = 0;

    if (this.subChallenges.length) {
      const stagedChallenges = this.mostAdvancedSubChallenges.toArray();
      progress = stagedChallenges.reduce((sum, subChallenge) => sum + subChallenge.progress, 0);
      progress /= stagedChallenges.length;
    } else {
      progress = this.completion / this.treshold;
    }

    return Math.min(progress, 1);
  }

  @sort('subChallenges')
  sortedSubChallenges(subChallengeA, subChallengeB) {
    if (subChallengeA.progress !== subChallengeB.progress) return subChallengeB.progress - subChallengeA.progress;

    return subChallengeA.description.localeCompare(subChallengeB.description);
  }

  @computed('sortedSubChallenges', 'treshold')
  get mostAdvancedSubChallenges() {
    return this.sortedSubChallenges.slice(0, this.treshold);
  }

  @computed('sortedSubChallenges', 'treshold')
  get leastAdvancedSubChallenges() {
    return this.sortedSubChallenges.slice(this.treshold, this.sortedSubChallenges.length);
  }
}
