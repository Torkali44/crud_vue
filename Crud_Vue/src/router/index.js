import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import StudentsView from "../views/StudentsView.vue";
import ContactView from "../views/ContactView.vue";
import AboutView from "../views/AboutView.vue";
import GalleryView from "../views/GalleryView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/students", name: "students", component: StudentsView },
  { path: "/contact", name: "contact", component: ContactView },
  { path: "/about", name: "about", component: AboutView },
  { path: "/gallery", name: "gallery", component: GalleryView },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
