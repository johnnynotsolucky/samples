import Vue from 'vue';
import Vuex from 'vuex';
import http from 'http';

Vue.use(Vuex);

const options = {
  state: {
    value: 'foobar',
  },
  mutations: {
    SET_VALUE(state, value) {
      state.value = value;
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
  },
};

export default new Vuex.Store(options);
export { options };
