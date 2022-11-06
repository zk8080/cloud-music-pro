import MyLayout from "@/layout";
import Home from "@/pages/Home";
import Category from "@/pages/Category";
import Singer from "@/pages/Singer";
import SongList from "@/pages/SongList";
import SingerDetail from "@/pages/SingerDetail";

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
      },
      {
        path: "songList/:id",
        component: SongList
      },
      {
        path: "singerDetail/:id",
        component: SingerDetail
      }
    ]
  }
];
