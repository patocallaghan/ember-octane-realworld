import ApplicationAdapter from './application';

export default class CommentAdapter extends ApplicationAdapter {
  pathForType() {
    return 'articles';
  }

  buildURL(modelName, id, snapshot) {
    let url = `${super.buildURL(modelName, snapshot.record.get('article.id'), snapshot)}/comments`;

    if (id) {
      url += `/${id}`;
    }

    return url;
  }
}
