import Component from '@glimmer/component';

export default class PaginationList extends Component {
  get pages() {
    if (!this.args.total || this.args.total <= this.args.pageSize) {
      return [];
    }
    const pages = Math.ceil(this.args.total / this.args.pageSize);
    return Array.from(Array(pages).keys()).map(num => ++num);
  }
}
