import Route from '@ember/routing/route';

export default class ProfileFavoritesRoute extends Route {
  templateName = 'profile/index';

  async afterModel(profile) {
    /**
     * Reload the data when visiting the route, otherwise the data remains stale.
     */
    await profile.favoriteArticles.reload();
  }
}
