import ApplicationAdapter from './application';
import ENV from 'realworld-starter-kit/config/environment';

export default class UserAdapter extends ApplicationAdapter {
  urlForUpdateRecord() {
    return `${ENV.APP.apiHost}/user`;
  }
}
