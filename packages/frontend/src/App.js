import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Checkout } from "./features/checkout/Checkout.jsx";
import { Home } from "./features/home/Home.jsx";
import Layout from "./features/layout/Layout.jsx";
import { HistorialPedidos } from "./features/orders/HistorialPedidos.jsx";
import { Producto } from "./features/products/Producto.jsx";
import { Search } from "./features/search/Search.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products/:id" element={<Producto />} />
          <Route path="/search" element={<Search />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/users/:id" element={<HistorialPedidos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
