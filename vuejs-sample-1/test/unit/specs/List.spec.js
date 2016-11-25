import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import List from 'src/components/List';
import { options } from 'src/store';
import Api from 'src/store/api';

describe('List.vue', () => {
  let testOptions;
  let api;

  beforeEach(() => {
    // Another option is to instantiate Api once in the before() hook, and
    // restore the stub in the beforeEach() hook
    api = new Api();
    // Clone the default store options so we can ensure clean state
    testOptions = _.cloneDeep(options);
  });

  // This test case tries to run assertions against state changes triggered
  // by our faked server side events. Once again we have an intractable
  // dependency. This method is not preferable as it has a number of direct
  // dependencies and becomes difficult to run in isolation. We also have a few
  // side-effects: the test runner could timeout; the SSE could emit
  // undesirable data.
  it.skip('intractable updates to state', (done) => {
    // Stub our CONNECT action like we did in Reverse.spec
    sinon.stub(testOptions.actions, 'CONNECT', ({ commit }) => {
      api.once('event', (event) => { commit('ADD_ITEM', event); });
      api.connect(); // We're connecting to the real api
    });
    // Group our assertions for readability
    function assertions() {
      assert.equal(this.items.length, 1); // We know one item should exist
      // We cannot assert against the value of the item
      // The <li /> element should correlate the previous test
      assert.equal(this.$el.querySelectorAll('ul > li').length, 1);
      done();
    }
    const stubbedStore = new Vuex.Store(testOptions);
    const updated = function updated() {
      Vue.nextTick()
        .then(assertions.bind(this))
        .catch(done);
    };
    const Component = Vue.extend({ ...List, store: stubbedStore, updated });
    new Component().$mount(); // eslint-disable-line no-new
  });

  // A workaround is to mock out the functionality which connects to and
  // listens for events from the fake event stream. This gives us full control
  // over emitted data, and mitigates uncontrollable dependencies.
  it('dependable updates to state', (done) => {
    // First we stub relevant methods in our API
    sinon.stub(api, 'fakeSse', function fakeSse() {
      setTimeout(() => { this.emit('event', 'foobar'); }, 25);
    });
    // Then we stub our CONNECT action to make sure we're listening to the
    // correct EventEmitter
    sinon.stub(testOptions.actions, 'CONNECT', ({ commit }) => {
      api.once('event', (event) => {
        commit('ADD_ITEM', event);
      });
      api.connect();
    });
    // Group our assertions for readability
    function assertions() {
      assert.equal(this.items.length, 1); // We know one item should exist
      assert.equal(this.items[0], 'foobar'); // That item should be 'foobar'
      // The <li /> element should correlate the previous tests
      assert.equal(this.$el.querySelectorAll('ul > li').length, 1);
      assert.match( // Generated <li /> text is wrapped with whitespace, test for it
        this.$el.querySelector('ul > li').textContent,
        /^\s*foobar\s*$/);
      done();
    }
    const stubbedStore = new Vuex.Store(testOptions);
    const updated = function updated() {
      Vue.nextTick()
        .then(assertions.bind(this))
        .catch(done);
    };
    const Component = Vue.extend({ ...List, store: stubbedStore, updated });
    new Component().$mount(); // eslint-disable-line no-new
  });
});
