import React from "react";
import { ArrowLeft } from "../icons/ArrowLeft";
import { ArrowRight } from "../icons/ArrowRight";
import "./Paginacion.css";

export const Paginacion = () => {
  return (
    <div className="paginacion">
      <ArrowLeft />
      <div className="current-page">
        <div className="text-wrapper">1</div>
      </div>

      <div className="page-number">2</div>

      <div className="page-number">3</div>

      <div className="page-ellipsis">...</div>

      <div className="page-number">15</div>

      <ArrowRight />
    </div>
  );
};
