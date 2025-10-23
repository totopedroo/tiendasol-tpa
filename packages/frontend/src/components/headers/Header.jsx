import React from "react";
import { ShoppingCart } from "../icons/ShoppingCart";
import "./Header.css";
import { User } from "../icons/User";
import { Bell } from "../icons/Bell";
import { SearchIcon } from "../icons/Search";

export const Header = () => {
  return (
    <div className="header">
      <div className="company">
        <img className="logo" alt="Logo" src="logo.png" />

        <div className="text-wrapper">TiendaSol</div>
      </div>

      <div className="frame">
        <div className="div">Productos</div>

        <div className="div">Categorías</div>

        <div className="div">Vender</div>

        <div className="div">Contacto</div>
      </div>

      <div className="frame-2">
        <div className="text-wrapper-2">Buscar productos...</div>

        <SearchIcon />
      </div>

      <div className="buttons">
        <Bell />
        <User />
        <div className="primary-button">
          <ShoppingCart />
          <div className="contador-de-items">0</div>
        </div>
      </div>
    </div>
  );
};
