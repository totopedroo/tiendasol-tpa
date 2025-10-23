import React from "react";
import { ShoppingCart } from "../icons/ShoppingCart.jsx";
import "./ItemDetail.css";

export const ItemDetail = () => {
  return (
    <div className="item-detail">
      <img className="img" alt="Detalle" src="image.png" />

      <div className="div">
        <div className="div-2">
          <div className="text-wrapper">Categoría</div>

          <div className="text-wrapper-2">Titulo</div>

          <div className="text-wrapper-3">$150.000</div>

          <p className="descripcion">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Leo eu
            aenean sed diam urna tempor pulvinar. Semper vel class aptent taciti
            sociosqu ad litora. Mus donec rhoncus eros lobortis nulla molestie
            mattis. Blandit quis suspendisse aliquet nisi sodales consequat
            magna. Ac tincidunt nam porta elementum a enim euismod. Cras
            eleifend turpis fames primis vulputate ornare sagittis. Netus
            suscipit auctor curabitur facilisi cubilia curae hac. Sem placerat
            in id cursus mi pretium tellus. Egestas iaculis massa nisl malesuada
            lacinia integer nunc. Orci varius natoque penatibus et magnis dis
            parturient. Non purus est efficitur laoreet mauris pharetra
            vestibulum. Finibus facilisis dapibus etiam interdum tortor ligula
            congue.
          </p>
        </div>

        <div className="div-3">
          <div className="div-4">
            <div className="text-wrapper-4">0</div>
          </div>

          <div className="div-wrapper">
            <div className="text-wrapper-5">Comprar ahora</div>
          </div>

          <div className="div-5">
            <ShoppingCart />
            <div className="text-wrapper-4">Agregar al carrito</div>
          </div>
        </div>
      </div>
    </div>
  );
};
