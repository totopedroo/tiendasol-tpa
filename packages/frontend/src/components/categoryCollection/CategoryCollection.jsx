import React from "react";
import "./CategoryCollection.css";
import { ArrowRight } from "../icons/ArrowRight";
import { Link } from "react-router-dom";

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
    "Deportes",
  ];

  return (
    <div className="category-collection flex flex-col items-center">
      <div className="categories-header flex items-center justify-between">
        <div className="title-wrapper">
          <div className="text-wrapper flex items-center justify-center">Categorías</div>
        </div>

        <div className="view-all-link flex items-center gap-2">
          <div className="text-wrapper-2">Ver Todas</div>
          <ArrowRight />
        </div>
      </div>

      <div className="categories-grid">
        {categorias.map((nombre) => (
          <div className="category-item" key={nombre}>
            <Link to={`/search`}>
                <div className="ellipse" />
                  <div className="text-wrapper-3">{nombre}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
