import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class TagListComponent extends Component {
  @service('authorizedFetch') authorizedFetch;

  @tracked tags = [];
  @tracked isLoading = false;

  constructor() {
    super(...arguments);
    this.loadTags();
  }

  async loadTags() {
    this.isLoading = true;
    let { tags } = await this.authorizedFetch.fetch('/tags');
    this.tags = tags;
    this.isLoading = false;
  }
}
