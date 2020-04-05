import * as types from "./mutation-types";
import { Auth } from "../api";

/* eslint-disable no-unused-vars */
export default {
  login: ({ commit }, authInfo) => {
    return Auth.login(authInfo)
      .then(({ token, userId }) => {
        commit(types.AUTH_LOGIN, { token, userId });
      })
      .catch((err) => {
        throw err;
      });
  },
  logout: ({ commit, state }) => {
    return Auth.logout(state.auth.token)
      .then(() => {
        commit(types.AUTH_LOGOUT, { token: null, userId: null });
      })
      .catch((err) => {
        throw err;
      });
  },
  fetchList: ({ commit }) => {
    throw new Error("fetchList is not implemented");
  },
  addTask: ({ commit }) => {
    throw new Error("addTask is not implemented");
  },
  updateTask: ({ commit }) => {
    throw new Error("updateTask is not implemented");
  },
  removeTask: ({ commit }) => {
    throw new Error("removeTask is not implemented");
  },
};
