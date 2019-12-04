import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async afterModel(profile) {
    /**
     * Reload the data when visiting the route, otherwise the data remains stale.
     */
    await profile.articles.reload();
  }
}
