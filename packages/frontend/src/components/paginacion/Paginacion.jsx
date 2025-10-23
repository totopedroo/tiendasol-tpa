import React from "react";
import { ArrowLeft } from "../icons/ArrowLeft";
import { ArrowRight } from "../icons/ArrowRight";
import "./Paginacion.css";

export const Paginacion = () => {
  return (
    <div className="paginacion">
      <ArrowLeft />
      <div className="frame">
        <div className="text-wrapper">1</div>
      </div>

      <div className="div">2</div>

      <div className="div">3</div>

      <div className="div">...</div>

      <div className="div">15</div>

      <ArrowRight />
    </div>
  );
};
