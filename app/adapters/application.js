import DS from 'ember-data';
import config from '../config/environment';
import { inject as service } from '@ember/service';

const { errorsHashToArray, RESTAdapter } = DS;

export default class ApplicationAdapter extends RESTAdapter {
  @service session;

  host = config.API.host;
  namespace = 'api';

  get headers() {
    const headers = {};

    if (this.session.token) {
      headers.Authorization = `Token ${this.session.token}`;
    }

    return headers;
  }

  handleResponse(status, headers, payload) {
    if (this.isInvalid(...arguments)) {
      payload.errors = errorsHashToArray(payload.errors);
    }

    return super.handleResponse(...arguments);
  }
}
