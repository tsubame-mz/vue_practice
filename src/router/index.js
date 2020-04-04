import Vue from "vue";
import VueRouter from "vue-router";
import KbnBoardView from "../components/templates/KbnBoardView";
import KbnLoginView from "../components/templates/KbnLoginView";
import KbnTaskDetailModal from "../components/templates/KbnTaskDetailModal";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: KbnBoardView,
    meta: { requireAuth: true },
  },
  {
    path: "/login",
    component: KbnLoginView,
  },
  {
    path: "/tasks/:id",
    component: KbnTaskDetailModal,
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
