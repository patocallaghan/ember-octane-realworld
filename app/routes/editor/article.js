import NewRoute from './new';

export default class EditorArticleRoute extends NewRoute {
  model({ slug }) {
    return this.store.findRecord('article', slug);
  }
}
