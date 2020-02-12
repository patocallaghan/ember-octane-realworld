import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class CommentComponent extends Component {
  @service('session') session;

  @action
  async deleteComment(e) {
    e.preventDefault();
    await this.args.comment.destroyRecord();
  }
}
