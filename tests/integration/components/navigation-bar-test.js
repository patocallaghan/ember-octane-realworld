import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import Service from '@ember/service';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | navigation-bar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders signed out', async function(assert) {
    await render(hbs`<NavigationBar />`);

    assert.dom('nav.navbar.navbar-light').exists();
    assert.dom('[data-test-navigation-bar-sign-in]').exists();
    assert.dom('[data-test-navigation-bar-editor-new]').doesNotExist();
  });

  test('it renders signed in', async function(assert) {
    this.owner.register(
      'service:session',
      Service.extend({
        isLoggedIn: true,
        // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
        user: {
          username: 'joe blogs',
          image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        },
      }),
    );
    await render(hbs`<NavigationBar />`);

    assert.dom('[data-test-navigation-bar-editor-new]').exists();
    assert.dom('[data-test-navigation-bar-sign-in]').doesNotExist();
    assert.dom('[data-test-currentUser-loggedIn]').containsText('joe blogs');

    assert
      .dom('[data-test-currentUser-user-pic]')
      .hasAttribute('src', 'https://static.productionready.io/images/smiley-cyrus.jpg');
  });
});
