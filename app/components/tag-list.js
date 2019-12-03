import Component from '@glimmer/component';
import { task } from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class TagList extends Component {
  @service store;
  @tracked tags = [];

  constructor() {
    super(...arguments);
    this.loadTags.perform();
  }

  @task({ drop: true })
  *loadTags() {
    /**
     * Query for popular tags.
     * Using findAll would return a live array that would get populated with tags from articles, which may/may-not be popular tags.
     */
    const tags = yield this.store.query('tag', {});
    this.tags = tags;
  }
}
