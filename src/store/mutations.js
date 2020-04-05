/* eslint-disable no-unused-vars */
import * as types from "./mutation-types";

export default {
  [types.AUTH_LOGIN](state, payload) {
    state.auth = payload;
  },
  [types.AUTH_LOGOUT](state, payload) {
    state.auth = payload;
  },
  [types.FETCH_ALL_TASK_LIST](state, payload) {
    state.board.lists = payload;
  },
  [types.ADD_TASK](state, payload) {
    throw new Error("ADD_TASK is not implemented");
  },
  [types.UPDATE_TASK](state, payload) {
    throw new Error("UPDATE_TASK is not implemented");
  },
  [types.REMOVE_TASK](state, payload) {
    throw new Error("REMOVE_TASK is not implemented");
  },
};
