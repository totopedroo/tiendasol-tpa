import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { CategoryCollection } from "./components/categoryCollection/CategoryCollection.jsx";
import { CarritoProvider } from "./context/CarritoContext.jsx";
import { Login } from "./features/auth/Login.jsx";
import { Register } from "./features/auth/Register.jsx";
import { ResetPassword } from "./features/auth/ResetPassword.jsx";
import { Checkout } from "./features/checkout/Checkout.jsx";
import { Contacto } from "./features/contacto/Contacto.jsx";
import { NotFound } from "./features/error/NotFound.jsx";
import { Home } from "./features/home/Home.jsx";
import Layout from "./features/layout/Layout.jsx";
import { HistorialPedidos } from "./features/orders/HistorialPedidos.jsx";
import { Producto } from "./features/products/Producto.jsx";
import { Search } from "./features/search/Search.jsx";
import { Vender } from "./features/ventas/Vender.jsx";
import FiltroDeSesion from "./components/filtroDeSesion/filtroDeSesion.jsx";
import { AuthProvider } from "./context/AuthContexto.jsx";

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
      <AuthProvider>
        <CarritoProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/products/:id" element={<Producto />} />
              <Route path="/search" element={<Search />} />
              <Route element={<FiltroDeSesion />}>
                <Route path="/ventas" element={<Vender />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<HistorialPedidos />} />
              </Route>
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/categorias" element={<CategoryCollection />} />
              <Route path="*" element={<NotFound />}></Route>
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
