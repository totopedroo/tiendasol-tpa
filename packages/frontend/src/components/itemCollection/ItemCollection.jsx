import React from "react";
import { ArrowRight } from "../icons/ArrowRight";
import { Item } from "../item/Item";
import "./ItemCollection.css";

export const ItemCollection = () => {
  return (
    <div className="item-collection">
      <div className="collection-header flex items-center justify-between">
        <div className="title-wrapper">
          <div className="text-wrapper">Productos Destacados</div>
        </div>

        <div className="view-all-link flex items-center gap-2">
          <div className="text-wrapper-2">Ver Todos</div>
          <ArrowRight />
        </div>
      </div>

      <div className="items-grid flex gap-6">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
};
