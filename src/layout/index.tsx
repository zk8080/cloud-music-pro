import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./index.scss";

function Layout() {
  return (
    <div className="cloud-music--layout">
      <NavBar />
      <Outlet></Outlet>
    </div>
  );
}

export default Layout;
