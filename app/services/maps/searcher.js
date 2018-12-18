// Vendor
import Service from '@ember/service';
import {computed} from '@ember-decorators/object';

// Utilities
import substringSearch from 'poe-world/utilities/substring-search';

export default class MapsSearcher extends Service {
  search(maps, query) {
    if (!query) return [];
    const queries = this._processQuery(query);

    return maps.filter(map => {
      return queries.every(({strategy, comparator, value}) => {
        return this.get(`_strategies.${strategy}`)(map, comparator, value);
      });
    });
  }

  _processQuery(query) {
    return query
      .split(';')
      .map(subQuery => {
        const [left, right] = subQuery.trim().split(/[\<\>\=]/);

        if (!right) return {strategy: 'name', comparator: '=', value: left.trim()};

        const strategyMatch = left.match(/(name|tier|alvl|pantheon|color|layout|boss|drop)/);
        if (!strategyMatch) return null;

        const [_, comparator] = subQuery.match(/([\<\>\=])/);
        return {strategy: strategyMatch[1], comparator, value: right.trim()};
      })
      .filter(Boolean);
  }

  @computed
  get _strategies() {
    return {
      name: (map, _, value) => substringSearch(map.name, value),
      tier: (map, comparator, value) => this._simpleCompare(map.tier, parseInt(value, 10), comparator),
      alvl: (map, comparator, value) => this._simpleCompare(map.areaLevel, parseInt(value, 10), comparator),
      pantheon: (map, _, value) => map.pantheon && substringSearch(map.pantheon, value),
      color: (map, _, value) => map.tierColor === value,
      layout: (map, comparator, value) => {
        return this._simpleCompare(value.toLowerCase(), map.layoutRating.toLowerCase(), comparator);
      },
      boss: (map, comparator, value) => this._simpleCompare(map.bossRating, parseInt(value, 10), comparator),
      drop: (map, _, value) => map.drops.some(({name}) => substringSearch(name, value))
    };
  }

  _simpleCompare(valueA, valueB, comparator) {
    if (comparator === '=') return valueA === valueB;
    if (comparator === '>') return valueA > valueB;
    if (comparator === '<') return valueA < valueB;

    return false;
  }
}
