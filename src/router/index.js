import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import ObjectsView from "../views/ObjectsView.vue";
import SourcesView from "../views/SourcesView.vue";
import ChartsView from "../views/ChartsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView
    },
    {
      path: "/objects",
      name: "objects",
      component: ObjectsView
    },
    {
      path: "/sources",
      name: "sources",
      component: SourcesView
    },
    {
      path: "/charts",
      name: "charts",
      component: ChartsView
    },
  ]
});

export default router;
