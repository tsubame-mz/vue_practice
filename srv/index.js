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
};
