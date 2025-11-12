/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { CircularProgress } from "@mui/joy";
import "./Button.css";

export const Button = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  children,
  icon,
  iconPosition = "left",
  onClick,
  disabled = false,
  className = "",
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    if (!onClick || isLoading || disabled) return;

    const result = onClick(e);

    if (result instanceof Promise) {
      setIsLoading(true);
      try {
        await result;
      } catch (error) {
        console.error("Error en onClick:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const buttonClasses = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? "btn-full-width" : "",
    icon && !children ? "btn-icon-only" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <CircularProgress
          size="sm"
          sx={{
            "--CircularProgress-size":
              size === "small" ? "16px" : size === "large" ? "24px" : "20px",
            "--CircularProgress-trackColor": "transparent",
            "--CircularProgress-progressColor":
              variant === "primary" || variant === "danger" ? "#fff" : "#000",
          }}
        />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="btn-icon btn-icon-left">{icon}</span>
          )}
          {children && <span className="btn-text">{children}</span>}
          {icon && iconPosition === "right" && (
            <span className="btn-icon btn-icon-right">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};
