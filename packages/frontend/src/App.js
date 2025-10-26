import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Checkout } from "./features/checkout/Checkout.jsx";
import { Home } from "./features/home/Home.jsx";
import Layout from "./features/layout/Layout.jsx";
import { HistorialPedidos } from "./features/orders/HistorialPedidos.jsx";
import { Producto } from "./features/products/Producto.jsx";
import { Search } from "./features/search/Search.jsx";
import { Vender } from "./features/ventas/Vender.jsx";
import { Contacto } from "./features/contacto/Contacto.jsx";
import { Login } from "./features/auth/Login.jsx";
import { ResetPassword } from "./features/auth/ResetPassword.jsx";
import { Register } from "./features/auth/Register.jsx";
import { CarritoProvider } from "./context/CarritoContext.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <CarritoProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/products/:id" element={<Producto />} />
            <Route path="/search" element={<Search />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/users/:id" element={<HistorialPedidos />} />
            <Route path="/ventas" element={<Vender />} />
            <Route path="/contacto" element={<Contacto />} />
          </Route>
          {/* Estas no llevan Layout */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
  );
}

export default App;
