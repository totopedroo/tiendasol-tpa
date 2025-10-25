/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from "react";
import { Skeleton } from "@mui/joy";
import { ArrowRight } from "../icons/ArrowRight";
import { ArrowLeft } from "../icons/ArrowLeft";
import { Item } from "../item/Item";
import { Button } from "../button/Button";
import "./ItemCollection.css";

export const ItemCollection = ({ items = [] }) => {
  const [index, setIndex] = useState(0);
  const ITEMS_VISIBLE = 5;

  // Resetear índice cuando cambien los items
  useEffect(() => {
    setIndex(0);
  }, [items]);

  // Navegación con límites
  const siguiente = useCallback(() => {
    setIndex((prev) => Math.min(prev + 1, items.length - ITEMS_VISIBLE));
  }, [items.length]);

  const anterior = useCallback(() => {
    setIndex((prev) => Math.max(prev - 1, 0));
  }, []);

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

      <div className="carousel-container">
        <Button
          variant="icon"
          icon={<ArrowLeft />}
          onClick={anterior}
          className="carousel-button carousel-button-left"
          aria-label="Anterior"
          disabled={index === 0}
        />
        <div className="carousel-wrapper">
          {!items.length ? (
            <div className="items-carousel">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="item-skeleton">
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    sx={{
                      borderRadius: "var(--radius-md)",
                      aspectRatio: "1 / 1",
                    }}
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width="60%"
                    sx={{ mt: 1 }}
                    animation="wave"
                  />
                  <Skeleton variant="text" width="80%" animation="wave" />
                  <Skeleton variant="text" width="40%" animation="wave" />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={40}
                    sx={{ mt: 2, borderRadius: "var(--radius-md)" }}
                    animation="wave"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="carousel-wrapper">
              <div
                className="items-carousel"
                style={{
                  transform: `translateX(-${index * (100 / ITEMS_VISIBLE)}%)`,
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                {items.map((item) => (
                  <Item item={item} key={item.id} />
                ))}
              </div>
            </div>
          )}
        </div>

        <Button
          variant="icon"
          icon={<ArrowRight />}
          onClick={siguiente}
          className="carousel-button carousel-button-right"
          aria-label="Siguiente"
          disabled={index >= items.length - ITEMS_VISIBLE}
        />
      </div>
    </div>
  );
};
