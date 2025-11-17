/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Skeleton } from "@mui/joy";
import "./ImageWithLoader.css";

export const ImageWithLoader = ({
  src,
  alt,
  className = "",
  placeholderClassName = "",
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (e) => {
    setIsLoading(false);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setIsLoading(false);
    setHasError(true);
    if (onError) onError(e);
  };

  return (
    <div className={`image-loader-container ${className}`}>
      {isLoading && !hasError && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          className={placeholderClassName}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? "image-loading" : "image-loaded"}`}
        onLoad={handleLoad}
        onError={handleError}
        style={{ display: hasError ? "none" : undefined }}
        {...props}
      />
      {hasError && (
        <div className={`image-error flex flex-col items-center justify-center w-full h-full ${placeholderClassName}`}>
          <span>📷</span>
          <p>Imagen no disponible</p>
        </div>
      )}
    </div>
  );
};
