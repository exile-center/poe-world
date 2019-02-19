// Vendor
import EmberObject from '@ember/object';
import {computed} from '@ember-decorators/object';

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
      const progresses = this.mostAdvancedSubChallenges.map(subChallenge => subChallenge.progress);
      progress = progresses.reduce((sum, progress) => sum + progress);
      progress /= progresses.length;
    } else {
      progress = this.completion / this.treshold;
    }

    return Math.min(progress, 1);
  }

  @computed('subChallenges')
  get sortedSubChallenges() {
    return this.subChallenges.sort((subChallengeA, subChallengeB) => {
      return subChallengeB.progress - subChallengeA.progress;
    });
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
