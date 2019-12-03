import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SettingsForm extends Component {
  image = this.args.image || '';
  username = this.args.username || '';
  bio = this.args.bio || '';
  email = this.args.email || '';
  password = this.args.password || '';

  @action
  submit(event) {
    event.preventDefault();
    const { image, username, bio, email, password } = this;

    return this.args.onSubmit({
      image,
      username,
      bio,
      email,
      password,
    });
  }

  @action
  change(field, event) {
    return this.args.onChange(field, event.target.value);
  }
}
