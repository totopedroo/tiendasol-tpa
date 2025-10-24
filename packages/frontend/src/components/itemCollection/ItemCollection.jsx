import React from "react";
import { ArrowRight } from "../icons/ArrowRight";
import { Item } from "../item/Item";
import "./ItemCollection.css";

export const ItemCollection = () => {
  return (
    <div className="item-collection">
      <div className="collection-header">
        <div className="title-wrapper">
          <div className="text-wrapper-5">Otros productos del vendedor</div>
        </div>

        <div className="view-all-link">
          <div className="text-wrapper-6">Ver Todos</div>
          <ArrowRight />
        </div>
      </div>

      <div className="items-grid">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
};
