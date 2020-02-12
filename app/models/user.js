import DS from 'ember-data';
const { Model, attr } = DS;
import { inject as service } from '@ember/service';

export default class UserModel extends Model {
  @service('authorizedFetch') authorizedFetch;

  @attr('string') bio;
  @attr('string') email;
  @attr('string') image;
  @attr('string') password;
  @attr('string') token;
  @attr('string') username;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  async fetchFeed(page = 1) {
    let { articles } = await this.authorizedFetch.fetch(`/articles/feed?page=${page}`);
    if (!articles.length) {
      return [];
    }
    let ids = articles.map(article => article.slug);
    let normalizedArticles = articles.map(article =>
      Object.assign({}, article, { id: article.slug }),
    );
    this.store.pushPayload({ articles: normalizedArticles });
    return this.store.peekAll('article').filter(article => ids.includes(article.id));
  }
}
