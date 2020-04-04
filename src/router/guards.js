import store from "../store";

export const authorizeToken = (to, from, next) => {
  // 認証が必要な場合
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.auth || !store.state.auth.token) {
      // 認証トークンが無ければログインページに飛ばす
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    // 認証不要ならそのままページを開く
    next();
  }
};
