import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import TiendaSolLogoLink from "../tiendaSolLogo/TiendaSolLogoLink";


export const Footer = () => {
  return (
    <div className="footer">
      <div className="container-xl">
        <div className="text">
            <TiendaSolLogoLink/>
          <div className="nav">
            <div className="nav-link">
             <Link to={'/vender'}>Vender</Link>
            </div>
            <div className="nav-link">
              <Link to={'/categorias'}>Categorías</Link>
            </div>
            <div className="nav-link">
              <Link to={'/contacto'}>Contacto</Link>
            </div>
          </div>

          {/* <div className="social-links">
            <div className="social-link">
              <Github className="size-24" color="black" opacity="0.45" />
            </div>
            <div className="social-link-2">
              <img className="vector" alt="Vector" src={image} />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
