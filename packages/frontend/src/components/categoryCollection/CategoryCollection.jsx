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
    <div className="category-collection flex-center-column">
      <div className="categories-header flex-row-between">
        <div className="title-wrapper">
          <div className="text-wrapper flex-row-center">Categorías</div>
        </div>

        <div className="view-all-link flex-row-between">
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
