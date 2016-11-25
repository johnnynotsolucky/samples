import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import Reverse from 'src/components/Reverse';
import store, { options } from 'src/store';

describe('Reverse.vue', () => {
  let testOptions;

  beforeEach(() => {
    // Clone the default store options so we can ensure clean state
    testOptions = _.cloneDeep(options);
  });

  // We know that our state requires an input to trigger a change to the
  // 'value' property. Therefore, we can test our initial
  // state without concerning ourselves with http request or any other kind
  // of dependency.
  it('renders initial state', () => {
    const Component = Vue.extend({ ...Reverse, store });
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Component),
    });
    assert.equal(vm.$el.querySelector('a').textContent, 'foobar');
  });

  // However, when we want to test changes to state which were triggered by
  // an asynchronous operation in our store, we run into trouble. Our tests
  // shouldn't care about the store, but we know that the component is
  // dependant on it. Thus, we now need to worry about intractable dependencies;
  // in our case, we have an http request to a server we have no control over.
  // The resolution is quite simple: We can mock out the action in our store.
  // Now we have complete control over test case.
  it('updates content when state changes', (done) => {
    sinon.stub(testOptions.actions, 'REVERSE', ({ commit }) => {
      setTimeout(() => {
        commit('SET_VALUE', 'oof');
      }, 100);
    });
    // Group our assertions for readability
    function assertions() {
      try {
        assert.equal(this.value, 'oof');
        assert.equal(this.$el.querySelector('a').textContent, 'oof');
        done();
      } catch (err) { // Failed assertions cause an unhandled promise error
        done(err); // Tell mocha what the actual error was
      }
    }
    // Create our store and include the stubbed methods.
    const stubbedStore = new Vuex.Store(testOptions);
    const updated = function updated() {
      Vue.nextTick(assertions.bind(this));
    };
    // With object destructuring, we can easily merge our required mock
    // functionality into the component we want to test.
    const Component = Vue.extend({ ...Reverse, store: stubbedStore, updated });
    const mounted = new Component().$mount();
    // Trigger a state change in our Vuex store. Because we have access to
    // the DOM, we could go a step further and simulate a user's click:
    // `mounted.$el.querySelector('a').click();`
    mounted.reverseValue();
  });
});
