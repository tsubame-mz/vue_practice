import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ErrorBoundary from "./ErrorBoundary";

Vue.config.productionTip = false;
Vue.config.performance = true;

// エラー捕捉
Vue.component(ErrorBoundary.name, ErrorBoundary);

Vue.config.errorHandler = (err, vm, info) => {
  console.log("errorHandler: err", err);
  console.log("errorHandler: vm", vm);
  console.log("errorHandler: info", info);
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
