import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ArticleRoute extends Route {
  @service session;
  @service store;

  model({ slug }) {
    return this.store.findRecord('article', slug);
  }
}
