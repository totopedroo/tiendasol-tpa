import React from "react";
import { Skeleton } from "@mui/joy";
import "./ItemSkeleton.css";

export const ItemSkeleton = () => {
  return (
    <div className="item-skeleton">
      <Skeleton
        variant="rectangular"
        width="100%"
        sx={{
          borderRadius: "var(--radius-md)",
          aspectRatio: "1 / 1",
        }}
        animation="wave"
      />
      <Skeleton variant="text" width="60%" sx={{ mt: 1 }} animation="wave" />
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
  );
};
