import DS from 'ember-data';
const { errorsHashToArray, RESTAdapter } = DS;
import { inject as service } from '@ember/service';
import ENV from 'realworld-starter-kit/config/environment';

export default class ApplicationAdapter extends RESTAdapter {
  @service('session') session;

  host = ENV.APP.apiHost;

  headers = {
    Authorization: this.session.token ? `Token ${this.session.token}` : '',
  };

  handleResponse(status, headers, payload) {
    if (this.isInvalid(...arguments)) {
      payload.errors = errorsHashToArray(payload.errors);
    }

    return super.handleResponse(...arguments);
  }
}
