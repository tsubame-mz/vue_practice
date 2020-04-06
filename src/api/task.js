import client from "./client";

export default {
  add: (token, { name, listId }) => {
    return new Promise((resolve, reject) => {
      client
        .post("/task/add", { name, listId }, { headers: { "x-kbn-token": token } })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(new Error(err.response.data.message || err.message)));
    });
  },

  update: (token, { id, name, description, listId }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`/task/${id}/update`, { name, description, listId }, { headers: { "x-kbn-token": token } })
        .then(() => {
          resolve();
        })
        .catch((err) => reject(new Error(err.response.data.message || err.message)));
    });
  },

  remove: (token, { id }) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`/task/${id}/remove`, { headers: { "x-kbn-token": token } })
        .then(() => {
          resolve();
        })
        .catch((err) => reject(new Error(err.response.data.message || err.message)));
    });
  },
};
