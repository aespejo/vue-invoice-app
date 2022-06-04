import { createRouter, createWebHistory } from "vue-router";
import HomePAge from "../views/Home.vue";
import InvoicePage from "../views/InvoiceView.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePAge,
  },
  {
    path: "/invoice/:invoiceId",
    name: "Invoice",
    component: InvoicePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
