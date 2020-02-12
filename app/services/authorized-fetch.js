import Service from '@ember/service';
import { inject as service } from '@ember/service';
import ENV from 'realworld-starter-kit/config/environment';

export default class AuthorizedFetchService extends Service {
  @service('session') session;

  async fetch(url, method = 'GET') {
    let response = await fetch(`${ENV.APP.apiHost}${url}`, {
      method,
      headers: {
        Authorization: this.session.token ? `Token ${this.session.token}` : '',
      },
    });
    let payload = await response.json();
    return payload;
  }
}
