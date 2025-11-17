import React from "react";
import "./CategoryCollection.css";
import { ArrowRight } from "../icons/ArrowRight";
import { Link } from "react-router-dom";
import { categorias } from "../../mockdata/Categorias";
import { ImageWithLoader } from "../imageWithLoader/ImageWithLoader";
import { useEffect, useState } from "react";
import { getCategorias } from "../../service/categoriasService";

export const CategoryCollection = () => {

  const [categorias, setCategorias] = useState([]);
  
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const response = await getCategorias();
        setCategorias(response.categorias || []);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
        setCategorias([]);
      } 
    };
    cargarCategorias();
  }, []);


  return (
    <div className="category-collection flex flex-col items-center">
      <div className="categories-header flex items-center justify-between">
        <div className="title-wrapper">
          <div className="text-wrapper flex items-center justify-center">
            Categorías
          </div>
        </div>

        <div className="view-all-link flex items-center gap-2">
          <div className="text-wrapper-2">Ver Todas</div>
          <ArrowRight />
        </div>
      </div>

      <div className="categories-grid">
        {categorias.map((categoria) => (
          <div className="category-item" key={categoria._id} data-testid="category-card">
          <Link
            to={`/search?categoria=${categoria.nombre}`}
            className="category-link flex flex-col items-center"
          >
              <div className="ellipse">
                <ImageWithLoader
                  src={categoria.imagen}
                  alt={categoria.nombre}
                  className="category-image"
                />
              </div>
              <div className="text-wrapper-3">{categoria.nombre}</div>
          </Link>
        </div>
        ))}
      </div>
    </div>
  );
};
