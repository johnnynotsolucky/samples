import Vue from 'vue';
import Vuex from 'vuex';
import Simple from 'src/components/Simple';
import store, { options } from 'src/store';

describe('Simple.vue', () => {
  it('renders initial state', () => {
    const Component = Vue.extend({ ...Simple, store });
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Component),
    });
    assert.equal(vm.$el.querySelector('a').textContent, 'foobar');
  });

  it('updates content when state changes', (done) => {
    sinon.stub(options.actions, 'REVERSE', ({ commit }) => {
      setTimeout(() => {
        commit('SET_VALUE', 'oof');
      }, 100);
    });
    const stubbedStore = new Vuex.Store(options);
    const updated = function updated() {
      assert.equal(this.value, 'oof');
      Vue.nextTick(() => {
        assert.equal(this.$el.querySelector('a').textContent, 'oof');
        options.actions.REVERSE.restore();
        done();
      });
    };
    const Component = Vue.extend({ ...Simple, store: stubbedStore, updated });
    const mounted = new Component().$mount();
    mounted.reverseValue();
  });
});
