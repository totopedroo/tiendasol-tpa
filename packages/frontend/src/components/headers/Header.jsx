import React from "react";
import { ShoppingCart } from "../icons/ShoppingCart";
import "./Header.css";
import { User } from "../icons/User";
import { Bell } from "../icons/Bell";
import { SearchIcon } from "../icons/Search";

export const Header = () => {
  return (
    <div className="header">
      <div className="container-xl flex items-center justify-between">
        <div className="company flex items-center">
          <img className="logo" alt="Logo" src="/images/logo.png" />

          <div className="text-wrapper flex items-center">TiendaSol</div>
        </div>

        <div className="navigation-menu flex items-center">
          <div className="nav-item flex items-center">Productos</div>

          <div className="nav-item flex items-center">Categorías</div>

          <div className="nav-item flex items-center">Vender</div>

          <div className="nav-item flex items-center">Contacto</div>
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
          <User className="user-icon-header" />
          <div className="primary-button flex items-center">
            <ShoppingCart />
            <div className="contador-de-items flex items-center">0</div>
          </div>
        </div>
      </div>
    </div>
  );
};
