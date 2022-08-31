import { lazy } from "react";

const Layout = lazy(() => import("../layout/index"));
const Home = lazy(() => import("../pages/Home/index"));
const Category = lazy(() => import("../pages/Category/index"));

export const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        component: Home
      },
      {
        path: "category",
        component: Category
      }
    ]
  }
];
