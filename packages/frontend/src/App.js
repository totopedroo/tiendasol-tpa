import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./features/home/Home.jsx";
import Layout from "./features/layout/Layout.jsx";
import { Producto } from "./features/products/Producto.jsx";
import { Search } from "./features/search/Search.jsx";
import { Checkout } from "./features/checkout/Checkout.jsx";
import { HistorialPedidos } from "./features/orders/HistorialPedidos.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products/:id" element={<Producto />} />
          <Route path="/search" element={<Search/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/users/:id" element={<HistorialPedidos/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
