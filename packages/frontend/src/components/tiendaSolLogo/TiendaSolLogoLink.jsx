
import React from 'react';
import { Link } from 'react-router-dom';
import './TiendaSolLogoLink.css';

const TiendaSolLogoLink = () => {
  return (
    <Link to={'/'} className="company-logo-link">
      <div className="company-logo-group flex-row-center">
        <img alt="TiendaSol Logo" src="/images/logo.png" />
        <div className="company-name-text flex-row-center">TiendaSol</div>
      </div>
    </Link>
  );
};

export default TiendaSolLogoLink;