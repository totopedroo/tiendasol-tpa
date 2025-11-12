import { Outlet } from "react-router";
import React from "react";
import { Header } from "../../components/headers/Header";
import { Footer } from "../../components/footer/Footer";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;