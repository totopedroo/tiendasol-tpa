import React from "react";
import { ShoppingCart } from "../icons/ShoppingCart.jsx";
import "./ItemDetail.css";

export const ItemDetail = () => {
  return (
    <div className="item-detail flex items-start">
      <img className="img" alt="Detalle" src="image.png" />

      <div className="product-info flex flex-col items-center">
        <div className="product-details flex flex-col items-center">
          <div className="text-wrapper flex items-center">Categoría</div>

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

        <div className="product-actions">
          <div className="quantity-selector">
            <div className="text-wrapper-4">0</div>
          </div>

          <div className="buy-now-button">
            <div className="text-wrapper-5">Comprar ahora</div>
          </div>

          <div className="add-to-cart-button">
            <ShoppingCart />
            <div className="text-wrapper-4">Agregar al carrito</div>
          </div>
        </div>
      </div>
    </div>
  );
};
