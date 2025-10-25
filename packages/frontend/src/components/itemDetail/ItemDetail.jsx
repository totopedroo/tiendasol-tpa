import React from "react";
import { ShoppingCart } from "../icons/ShoppingCart.jsx";
import { Button } from "../button/Button.jsx";
import "./ItemDetail.css";

export const ItemDetail = () => {
  return (
    <div className="item-detail flex items-start">
      <div className="image-section">
        <div className="img-placeholder">
          {/* Si hay imagen, usar <img>, sino mostrar el placeholder */}
          {/* <img className="img" alt="Detalle" src="image.png" /> */}
        </div>

        <div className="image-thumbnails flex items-center gap-2">
          <div className="thumbnail-placeholder"></div>
          <div className="thumbnail-placeholder"></div>
          <div className="thumbnail-placeholder"></div>
          <div className="thumbnail-placeholder"></div>
        </div>
      </div>

      <div className="product-info flex flex-col items-start">
        <div className="product-details flex flex-col items-start">
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

        <div className="product-actions flex items-center justify-end gap-4">
          <div className="quantity-wrapper flex items-center gap-2">
            <span className="quantity-label">Cantidad:</span>
            <select className="quantity-select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <Button variant="primary">Comprar ahora</Button>

          <Button variant="secondary" icon={<ShoppingCart />}>
            Agregar al carrito
          </Button>
        </div>
      </div>
    </div>
  );
};
