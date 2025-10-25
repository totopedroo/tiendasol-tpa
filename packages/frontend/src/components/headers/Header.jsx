import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "../icons/ShoppingCart";
import "./Header.css";
import { User } from "../icons/User";
import { Bell } from "../icons/Bell";
import { SearchIcon } from "../icons/Search";

export const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = false; // Temporal, más adelante vendrá de contexto o backend

  const irACheckout = () => {
    navigate("/checkout");
  };

  const irAUsuario = () => {
    if (isLoggedIn) {
      navigate("/users/1"); // Temporal, más adelante vendrá de contexto o backend :id
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="header">
      <div className="container-xl flex items-center justify-between">
        <Link to={`/`} className="company flex items-center">
          <img className="logo" alt="Logo" src="/images/logo.png" />

          <div className="text-wrapper flex items-center">TiendaSol</div>
        </Link>

        <div className="navigation-menu flex items-center">
          <div className="nav-item flex items-center">Productos</div>

          <div className="nav-item flex items-center">Categorías</div>

          <Link to="/ventas" className="nav-item flex items-center">
            Vender
          </Link>
          <Link to="/contacto" className="nav-item flex items-center">
            Contacto
          </Link>
        </div>

        <div className="search-bar">
          <input
            className="search-input"
            placeholder="Buscar productos..."
          ></input>
          <SearchIcon className="search-icon" />
        </div>

        <div className="buttons flex items-center">
          <Bell />
          <div className="primary-button" onClick={irAUsuario}>
            <User className="user-icon-header" />
          </div>
          <div
            className="primary-button flex items-center"
            onClick={irACheckout}
          >
            <ShoppingCart />
            <div className="contador-de-items flex items-center">0</div>
          </div>
        </div>
      </div>
    </div>
  );
};
