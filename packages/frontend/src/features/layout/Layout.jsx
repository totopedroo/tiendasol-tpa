import { Outlet } from "react-router";
import React from "react";
import { Header } from "../../components/headers/Header";
import { Footer } from "../../components/footer/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
