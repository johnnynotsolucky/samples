import Vue from 'vue';
import Vuex from 'vuex';
import http from 'http';
import Api from './api';

Vue.use(Vuex);

const options = {
  state: {
    value: 'foobar',
    items: [],
  },
  mutations: {
    SET_VALUE(state, value) {
      state.value = value;
    },
    ADD_ITEM(state, item) {
      if (state.items.length === 10) {
        state.items.shift();
      }
      state.items.push(item);
    },
  },
  actions: {
    REVERSE({ commit }, { value }) {
      // Pretend httpbin did the string reversal for us...
      const reversed = value.split('').reverse().join('');
      return http.get(`https://httpbin.org/get?param=${reversed}`, (response) => {
        let body = '';
        response.on('data', (chunk) => {
          body += chunk;
        });
        response.on('end', () => {
          const obj = JSON.parse(body);
          commit('SET_VALUE', obj.args.param);
        });
      });
    },
    CONNECT({ commit }) {
      const api = new Api();
      api.on('event', (event) => {
        commit('ADD_ITEM', event);
      });
      api.connect();
    },
  },
};

export default new Vuex.Store(options);
export { options };
