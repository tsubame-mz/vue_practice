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

  // タスク生成
  const createTask = (listId) => {
    const id = generateTaskId();
    return {
      id: id,
      name: "タスク" + id,
      description: "これはタスク" + id + "です。",
      listId,
    };
  };

  // タスクリスト生成
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

  // タスク追加
  function addTask(board, name, listId) {
    let task = null;
    for (let i = 0; i < board.lists.length; i++) {
      const list = board.lists[i];
      if (list.id === listId) {
        task = {
          id: generateTaskId(),
          name: name,
          description: "",
          listId,
        };
        list.items.push(task);
        break;
      }
    }
    return task;
  }

  app.post("/task/add", (req, res) => {
    const token = req.headers["x-kbn-token"];
    if (!token) {
      return res.status(403).json({ message: "許可されていません" });
    }

    const { name, listId } = req.body;
    const task = addTask(board, name, listId);
    if (task) {
      res.status(201).json(task);
    } else {
      res.status(500).json({ message: "タスク追加に失敗しました。" });
    }
  });

  // タスク更新
  function updateTask(board, id, name, description, listId) {
    let ret = false;
    for (let i = 0; i < board.lists.length; i++) {
      const list = board.lists[i];
      if (list.id !== listId) {
        continue;
      }
      for (let j = 0; j < list.items.length; j++) {
        const item = list.items[j];
        if (item.id === id) {
          item.name = name;
          item.description = description;
          ret = true;
          break;
        }
      }
    }
    return ret;
  }

  app.put("/task/:id/update", (req, res) => {
    const token = req.headers["x-kbn-token"];
    if (!token) {
      return res.status(403).json({ message: "許可されていません" });
    }

    const id = parseInt(req.params.id);
    const { name, description, listId } = req.body;
    const ret = updateTask(board, id, name, description, listId);
    if (ret) {
      res.sendStatus(200);
    } else {
      res.status(500).json({ message: "タスク更新に失敗しました。" });
    }
  });

  // タスク削除
  function removeTask(board, id) {
    board.lists.forEach((list) => {
      list.items = list.items.filter((item) => item.id !== id);
    });
  }

  app.delete("/task/:id/remove", (req, res) => {
    const token = req.headers["x-kbn-token"];
    if (!token) {
      return res.status(403).json({ message: "許可されていません" });
    }

    const id = parseInt(req.params.id);
    removeTask(board, id);
    res.sendStatus(204);
  });
};
