import express from "express";

// eslint-disable-next-line no-unused-vars
export default (app, http) => {
  app.use(express.json());

  // ユーザー情報(ダミー)
  const users = {
    "foo@domain.com": {
      password: "12345678",
      userId: 1,
      token: "1234567890abcdef",
    },
  };

  let nextTaskListId = 1; // タスクリストID
  let nextTaskId = 1; // タスクID
  const generateTaskListId = () => nextTaskListId++; // タスクリストID生成
  const generateTaskId = () => nextTaskId++; // タスクID生成

  // タスクを生成
  const createTask = (listId) => {
    const id = generateTaskId();
    return {
      id: id,
      name: "タスク" + id,
      description: "これはタスク" + id + "です。",
      listId,
    };
  };

  // タスクリストを生成
  const createTaskList = (name, num) => {
    const id = generateTaskListId();
    const list = { id, name, items: [] };
    for (let i = 0; i < num; i++) {
      list.items.push(createTask(id));
    }
    return list;
  };

  // ボード情報(ダミー)
  const board = {
    lists: [createTaskList("TODO", 2), createTaskList("WIP", 1), createTaskList("DONE", 3)],
  };

  app.post("/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = users[email];
    if (user) {
      if (user.password !== password) {
        res.status(401).json({ message: "ログインに失敗しました。" });
      } else {
        res.json({ userId: user.userId, token: user.token });
      }
    } else {
      res.status(404).json({ message: "ユーザーが登録されていません。" });
    }
  });

  app.delete("/auth/logout", (req, res) => {
    const token = req.headers["x-kbn-token"];
    if (!token) {
      return res.status(403).json({ message: "許可されていません" });
    }
    res.sendStatus(204);
  });

  app.get("/lists", (req, res) => {
    const token = req.headers["x-kbn-token"];
    if (!token) {
      return res.status(403).json({ message: "許可されていません" });
    }
    res.json({ lists: board.lists });
  });
};
