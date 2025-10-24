import React from "react";
import { ShoppingCart } from "../icons/ShoppingCart";
import "./Header.css";
import { User } from "../icons/User";
import { Bell } from "../icons/Bell";
import { SearchIcon } from "../icons/Search";

export const Header = () => {
  return (
    <div className="header">
      <div className="container flex-row-between">
        <div className="company flex-row-center">
          <img className="logo" alt="Logo" src="logo.png" />

          <div className="text-wrapper flex-row-center">TiendaSol</div>
        </div>

        <div className="navigation-menu flex-row-center">
          <div className="nav-item flex-row-center">Productos</div>

          <div className="nav-item flex-row-center">Categorías</div>

          <div className="nav-item flex-row-center">Vender</div>

          <div className="nav-item flex-row-center">Contacto</div>
        </div>

        <div className="search-bar flex-row-between">
          <div className="text-wrapper-2 flex-row-center">
            Buscar productos...
          </div>

          <SearchIcon />
        </div>

        <div className="buttons flex-row-center">
          <Bell />
          <User />
          <div className="primary-button flex-row-center">
            <ShoppingCart />
            <div className="contador-de-items flex-row-center">0</div>
          </div>
        </div>
      </div>
    </div>
  );
};
