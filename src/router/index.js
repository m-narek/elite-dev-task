import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "index-page",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
