// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type} from '@ember-decorators/argument/type';
import {computed} from '@ember-decorators/object';
import Chart from 'chartjs';

// Constants
const LEAGUE_COLOR = '#fff';
const POSITIVE_PROGRESS = '#5b8744';
const NEGATIVE_PROGRESS = '#967e25';
const NULL_COLOR = 'rgba(0,0,0,0)';
const CHART_OPTIONS = {
  responsive: false,
  aspectRatio: 1,
  tooltips: {
    enabled: false
  },
  legend: {
    display: false
  }
};

export default class ChallengeProgressDoughnutChart extends Component {
  @argument
  @type('object')
  challenge = null;

  @argument
  @type('object')
  league = null;

  chart = null;

  @computed('challenge.progress')
  get formattedChallengeProgress() {
    return Math.round(this.challenge.progress * 100);
  }

  @computed('league.progress')
  get formattedLeagueProgress() {
    return Math.round(this.league.progress * 100);
  }

  @computed('challenge.progress', 'league.progress')
  get challengeColor() {
    if (this.challenge.progress > this.league.progress) return POSITIVE_PROGRESS;
    return NEGATIVE_PROGRESS;
  }

  @computed('league.progress')
  get leagueDataset() {
    return {
      borderWidth: 0,
      backgroundColor: [LEAGUE_COLOR, NULL_COLOR],
      hoverBackgroundColor: [LEAGUE_COLOR, NULL_COLOR],
      borderColor: [LEAGUE_COLOR, NULL_COLOR],
      data: [this.league.progress, 1 - this.league.progress]
    };
  }

  @computed('challenge.progress')
  get challengeDataset() {
    return {
      borderWidth: 0,
      backgroundColor: [this.challengeColor, NULL_COLOR],
      hoverBackgroundColor: [this.challengeColor, NULL_COLOR],
      borderColor: [this.challengeColor, NULL_COLOR],
      data: [this.challenge.progress, 1 - this.challenge.progress]
    };
  }

  didInsertElement() {
    const context = this.$('canvas')[0].getContext('2d');

    const chart = new Chart(context, {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [this.challengeDataset, this.leagueDataset]
      },
      options: CHART_OPTIONS
    });

    this.set('chart', chart);
  }

  didUpdateAttrs() {
    if (!this.chart) return;

    this.chart.data.datasets[0] = this.challengeDataset;
    this.chart.update(0); // Update with no animation
  }
}
