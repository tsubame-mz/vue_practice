import * as types from "./mutation-types";
import { Auth, List, Task } from "../api";

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
  fetchList: ({ commit, state }) => {
    return List.fetch(state.auth.token)
      .then(({ lists }) => {
        commit(types.FETCH_ALL_TASK_LIST, lists);
      })
      .catch((err) => {
        throw err;
      });
  },
  addTask: ({ commit, state }, { name, listId }) => {
    return Task.add(state.auth.token, { name, listId })
      .then((task) => {
        commit(types.ADD_TASK, task);
      })
      .catch((err) => {
        throw err;
      });
  },
  updateTask: ({ commit, state }, task) => {
    return Task.update(state.auth.token, task)
      .then(() => {
        commit(types.UPDATE_TASK, task);
      })
      .catch((err) => {
        throw err;
      });
  },
  removeTask: ({ commit, state }, { id, listId }) => {
    return Task.remove(state.auth.token, { id })
      .then(() => {
        commit(types.REMOVE_TASK, { id, listId });
      })
      .catch((err) => {
        throw err;
      });
  },
};
