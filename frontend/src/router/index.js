
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/layouts/AppBar.vue"),
      redirect: { name: "Login" },
      children: [
        {
          path: "/product",
          name: "Product",
          component: () => import("@/pages/Product.vue"),
        },
        {
          path: "/login",
          name: "Login",
          component: () => import("@/pages/index.vue"),
        },
        {
          path: "/cart",
          name: "Cart",
          component: () => import("@/pages/Cart.vue"),
        },
        {
          path: "/admin",
          name: "",
      redirect: { name: "AdminProduct" },

          children: [
            {
              path: "/admin/product",
              name: "AdminProduct",
              component: () => import("@/pages/AdminProduct.vue"),
            },
          ],
        },
      ],
    },
  ],
});

export default router;
