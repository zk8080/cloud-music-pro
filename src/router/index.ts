import MyLayout from "@/layout";
import Home from "@/pages/Home";
import Category from "@/pages/Category";
import Singer from "@/pages/Singer";

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
      },
      {
        path: "singer",
        component: Singer
      }
    ]
  }
];
