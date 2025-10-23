import React from "react";
import { ArrowRight } from "../icons/ArrowRight";
import { Item } from "../item/Item";
import "./ItemCollection.css";

export const ItemCollection = () => {
  return (
    <div className="item-collection">
      <div className="div-2">
        <div className="div-wrapper">
          <div className="text-wrapper-5">Otros productos del vendedor</div>
        </div>

        <div className="div-3">
          <div className="text-wrapper-6">Ver Todos</div>
          <ArrowRight />
        </div>
      </div>

      <div className="div-4">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
};
