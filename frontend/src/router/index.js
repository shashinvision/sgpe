import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);
Vue.use(store);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      // ruta protegida
      requiresAuth: true,
    },
    component: Home,
  },
  {
    path: "/Login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/Admin",
    name: "Admin",
    meta: {
      // ruta protegida
      requiresAuth: true,
    },
    component: () => import("../views/Admin.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// para proteger las rutas
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // if (store.state.auth) {
    // Acceso a vuex sin segmentar
    //   next();
    // } else {
    //   next({ name: "Login" });
    // }
    if (store._modules.root.state.access.auth) {
      // En caso que nuestro Vuex esté segmentado
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;
