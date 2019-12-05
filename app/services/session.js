import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import ENV from 'ember-octane-realworld/config/environment';

export const STORAGE_KEY = 'realworld.ember-octane.token';

export default class SessionService extends Service {
  @service store;

  @tracked token;
  @tracked user;

  initSession() {
    const storedToken = this.getStoredToken();
    if (storedToken) {
      this.token = storedToken;
      return this.fetchUser();
    }
  }

  get isLoggedIn() {
    return !!this.token;
  }

  register(username, email, password) {
    const user = this.store.createRecord('user', {
      username,
      email,
      password,
    });
    return new Promise(resolve => {
      user
        .save()
        .then(() => {
          this.setToken(user.token);
        })
        .catch(err => err)
        .finally(() => {
          this.set('user', user);
          resolve(user);
        });
    });
  }

  async logIn(email, password) {
    const login = await fetch(`${ENV.API.host}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });
    const userPayload = await login.json();
    if (userPayload.errors) {
      const errors = this.processLoginErrors(userPayload.errors);
      return {
        errors,
      };
    } else {
      this.store.pushPayload({
        users: [userPayload.user],
      });
      this.setToken(userPayload.user.token);
      this.user = this.store.peekRecord('user', userPayload.user.id);
      return this.user;
    }
  }

  logOut() {
    this.removeToken();
  }

  async fetchUser() {
    const { user } = await this.fetch('/user');
    // Only push the user into the store if user is truthy
    // Otherwise store will throw errors where a type cannot be looked up on undefined.
    if (user) {
      this.store.pushPayload({
        users: [user],
      });
      this.set('user', this.store.peekRecord('user', user.id));
      return this.user;
    }
  }

  async fetch(url, method = 'GET') {
    const response = await fetch(`${ENV.API.host}/api${url}`, {
      method,
      headers: {
        Authorization: this.token ? `Token ${this.token}` : '',
      },
    });
    const payload = await response.json();
    return payload;
  }

  getStoredToken() {
    return localStorage.getItem(STORAGE_KEY);
  }

  setToken(token) {
    this.set('token', token);
    localStorage.setItem(STORAGE_KEY, token);
  }

  removeToken() {
    this.set('token', null);
    localStorage.removeItem(STORAGE_KEY);
  }

  processLoginErrors(errors) {
    const loginErrors = [];
    const errorKeys = Object.keys(errors);
    errorKeys.forEach(attribute => {
      errors[attribute].forEach(message => {
        loginErrors.push(`${attribute} ${message}`);
      });
    });
    return loginErrors;
  }
}
