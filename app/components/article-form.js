import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ArticleForm extends Component {
  @tracked newTags = '';
  title = this.args.title || '';
  description = this.args.description || '';
  body = this.args.body || '';

  get tags() {
    return this.args.tags || [];
  }

  @action
  submit(event) {
    event.preventDefault();
    const { title, description, body, tags } = this;
    return this.args.onSubmit({
      title,
      description,
      body,
      tags,
    });
  }

  @action
  change(field, event) {
    this.args.onChange(field, event.target.value);
  }

  @action
  addTags(event) {
    const ENTER_KEY = 13;
    const TAB_KEY = 9;
    const { keyCode } = event;

    if (keyCode === ENTER_KEY || keyCode === TAB_KEY) {
      if (keyCode === ENTER_KEY) {
        event.preventDefault();
      }

      /**
       * Add tags in a comma separated list, if there are any tags after trimming.
       * Ensure the tags aren't already included in the tagList.
       */
      const newTags = event.target.value
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean)
        .filter(tag => {
          return !this.args.tags.includes(tag);
        });

      this.args.onChange('tags', [...this.args.tags, ...newTags]);
      this.newTags = '';
    }
  }

  @action
  removeTag(index) {
    this.args.onChange('tags', [...this.args.tags.slice(0, index), ...this.args.tags.slice(index + 1)]);
  }
}
