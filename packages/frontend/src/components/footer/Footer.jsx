import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="container-xl">
        <div className="text">
          <div className="company">
            <div className="image" />
            <div className="text-wrapper">TiendaSol</div>
          </div>

          <div className="nav">
            <Link to="/ventas" className="nav-link">
              Vender
            </Link>
            <div className="nav-link">Categorías</div>
            <Link to="/contacto" className="nav-link">
              Contacto
            </Link>
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
