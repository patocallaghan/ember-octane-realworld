import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class ArticleListComponent extends Component {
  @service network;
  get articles() {
    return this.network.articles;
  }
}
