import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("../pages/home.vue") },
  { path: '/overview', component: () => import('../pages/overview.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
