import React from "react";
import { Link } from "react-router-dom";
import "./TiendaSolLogoLink.css";

const TiendaSolLogoLink = () => {
  return (
    <Link to={"/"} className="company-logo-link flex">
      <div className="company-logo-group flex items-center gap-1">
        <img alt="TiendaSol Logo" src="/images/logo.png" />
        <div className="company-name-text flex items-center">TiendaSol</div>
      </div>
    </Link>
  );
};

export default TiendaSolLogoLink;
