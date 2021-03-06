import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

const state = {
  auth: {
    token: null,
    userId: null,
  },
  board: {
    lists: [],
  },
};

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  modules: {},
  getters: getters,
});
