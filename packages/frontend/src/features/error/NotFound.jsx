import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";
import { Button } from "../../components/button/Button";

export const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-screen flex flex-col items-center">
      <div className="container">
        <div className="not-found-container flex flex-col items-center">
          <div className="not-found-number">404</div>
          <div className="not-found-message">Página no encontrada</div>
          <div className="not-found-description">
            Lo sentimos, la página que buscas no existe.
          </div>
          <Button variant="primary" size="large" onClick={handleGoBack}>
            Volver atrás
          </Button>
        </div>
      </div>
    </div>
  );
};
