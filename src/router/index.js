import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import CompanyView from "../views/CompanyView.vue";
import AccountSettingsView from "../views/AccountSettingsView.vue";
import ListView from "../views/ListView.vue";
import SettingsView from "../views/SettingsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView
    },
    {
      path: "/account",
      name: "account",
      component: AccountSettingsView
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
      path: "/list/:object",
      name: "list",
      component: ListView
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsView,
    },
  ]
});

export default router;
