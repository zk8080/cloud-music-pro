import MyLayout from "@/layout";
import Home from "@/pages/Home";
import Category from "@/pages/Category";

export const routes = [
  {
    path: "/",
    component: MyLayout,
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
