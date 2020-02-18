import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';

export default class NetworkService extends Service {
  @service session;
  @service store;
  @tracked tags = [];
  @tracked articles = [];

  @task({ restartable: true })
  *loadTags() {
    let { tags } = yield this.session.fetch('/tags');
    this.tags = tags;
  }

  @task({ restartable: true })
  *loadArticles({ page, tag, feed } = { page: 1, tag: '', feed: '' }) {
    let NUMBER_OF_ARTICLES = 10;
    let offset = (parseInt(page, 10) - 1) * NUMBER_OF_ARTICLES;
    this.articles = [];
    if (feed === 'your') {
      this.articles = yield this.session.user.fetchFeed(page);
    } else {
      this.articles = yield this.store.loadRecords('article', {
        limit: NUMBER_OF_ARTICLES,
        offset,
        tag: tag,
      });
    }
  }
}
