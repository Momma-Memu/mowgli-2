import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import ObjectsView from "../views/ObjectsView.vue";
import SourcesView from "../views/SourcesView.vue";
import ChartsView from "../views/ChartsView.vue";
import CompanyView from "../views/CompanyView.vue";
import RoleView from "../views/RoleView.vue";
import UsersView from "../views/UsersView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView
    },
    {
      path: "/charts",
      name: "charts",
      component: ChartsView
    },
    {
      path: "/company",
      name: "company",
      component: CompanyView
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
      path: "/roles",
      name: "roles",
      component: RoleView
    },
    {
      path: "/sources",
      name: "sources",
      component: SourcesView
    },
    {
      path: "/users",
      name: "users",
      component: UsersView
    }
  ]
});

export default router;
