import React from "react";
import { Skeleton } from "@mui/joy";
import "./ItemSkeleton.css";

export const ItemSkeleton = () => {
  return (
    <div className="item-skeleton flex flex-col w-full gap-2">
      <Skeleton
        variant="rectangular"
        sx={{
          width: "100%",
          aspectRatio: "1 / 1",
          borderRadius: "var(--radius-md)",
        }}
        animation="wave"
      />
      <Skeleton
        variant="text"
        width="60%"
        height={20}
        sx={{ mt: 1 }}
        animation="wave"
      />
      <Skeleton variant="text" width="80%" height={20} animation="wave" />
      <Skeleton variant="text" width="40%" height={20} animation="wave" />
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
