import React from "react";
import { ShoppingCart } from "../icons/ShoppingCart";
import "./Header.css";
import { User } from "../icons/User";
import { Bell } from "../icons/Bell";
import { SearchIcon } from "../icons/Search";
import { Link } from "react-router-dom";
import TiendaSolLogoLink from "../tiendaSolLogo/TiendaSolLogoLink";

export const Header = () => {
  return (
    <div className="header">
      <div className="navbar-content-wrapper"> 
        <div className="nav-left-section">
          <TiendaSolLogoLink />       
          <div className="navigation-menu flex-row-center">
              <Link to={'/search'} className="nav-item flex-row-center">Productos</Link>
              <Link to={'/categorias'} className="nav-item flex-row-center">Categorías</Link>
              <Link to={'/venta'} className="nav-item flex-row-center">Vender</Link>
              <Link to={'/contacto'} className="nav-item flex-row-center">Contacto</Link>
          </div>
        </div>
        
        <div className="nav-right-section flex-row-center"> 

          <div className="search-bar-input"> 
            <div className="search-placeholder-text flex-row-center"> 
              Buscar productos...
            </div>
            <button className="search-button">
              <SearchIcon />
            </button>
          </div>

          <div className="utility-buttons flex-row-center"> 
            <div className="notificaciones">
              <Link to={'/notificaciones'}><Bell/></Link>
            </div>
            <div className="user-profile-icon">
            <Link to={'/perfil'}><User/></Link>
            </div>

            <div className="cart-button flex-row-center"> 
              <Link to={'/carrito'}>
                  <ShoppingCart/>
              </Link>
              <div className="item-counter-badge flex-row-center">0</div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};