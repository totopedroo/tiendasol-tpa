import React from "react";
import "./CategoryCollection.css";
import { ArrowRight } from "../icons/ArrowRight";

export const CategoryCollection = () => {
  const categorias = [
    "Autos",
    "Tecnología",
    "Ropa",
    "Hogar",
    "Herramientas",
    "Cocina",
    "Joyas",
    "Instrumentos",
    "Consolas",
    "Bebés",
  ];

  return (
    <div className="category-collection">
      <div className="div">
        <div className="div-wrapper">
          <div className="text-wrapper">Categorías</div>
        </div>

        <div className="div-2">
          <div className="text-wrapper-2">Ver Todas</div>
          <ArrowRight />
        </div>
      </div>

      <div className="div-3">
        {categorias.map((nombre) => (
          <div className="div-4" key={nombre}>
            <div className="ellipse" />
            <div className="text-wrapper-3">{nombre}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
