import React from "react";
import { Skeleton } from "@mui/joy";
import "./ItemDetailSkeleton.css";

export const ItemDetailSkeleton = () => {
  return (
    <div className="item-detail-skeleton flex items-start">
      {/* Sección de imagen */}
      <div className="image-section-skeleton">
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={480}
          height={480}
          sx={{ borderRadius: "var(--radius-md)" }}
        />

        {/* Thumbnails */}
        <div className="thumbnails-skeleton flex items-center gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              animation="wave"
              variant="rectangular"
              width={80}
              height={80}
              sx={{ borderRadius: "var(--radius-sm)" }}
            />
          ))}
        </div>
      </div>

      {/* Sección de información del producto */}
      <div className="product-info-skeleton flex flex-col items-start">
        <div className="product-details-skeleton flex flex-col items-start">
          {/* Categoría */}
          <Skeleton
            animation="wave"
            variant="text"
            width={120}
            height={24}
            sx={{ marginBottom: "var(--space-2)" }}
          />

          {/* Título */}
          <Skeleton
            animation="wave"
            variant="text"
            width="80%"
            height={40}
            sx={{ marginBottom: "var(--space-2)" }}
          />

          {/* Precio */}
          <Skeleton
            animation="wave"
            variant="text"
            width={150}
            height={48}
            sx={{ marginBottom: "var(--space-4)" }}
          />

          {/* Descripción */}
          <div className="description-skeleton">
            <Skeleton
              animation="wave"
              variant="text"
              width="100%"
              height={20}
            />
            <Skeleton
              animation="wave"
              variant="text"
              width="100%"
              height={20}
            />
            <Skeleton animation="wave" variant="text" width="90%" height={20} />
            <Skeleton animation="wave" variant="text" width="95%" height={20} />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="product-actions-skeleton flex items-center justify-end gap-4">
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={100}
            height={40}
            sx={{ borderRadius: "var(--radius-md)" }}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={160}
            height={40}
            sx={{ borderRadius: "var(--radius-md)" }}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={180}
            height={40}
            sx={{ borderRadius: "var(--radius-md)" }}
          />
        </div>
      </div>
    </div>
  );
};
