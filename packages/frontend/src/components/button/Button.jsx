/* eslint-disable react/prop-types */
import React from "react";
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
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="btn-icon btn-icon-left">{icon}</span>
      )}
      {children && <span className="btn-text">{children}</span>}
      {icon && iconPosition === "right" && (
        <span className="btn-icon btn-icon-right">{icon}</span>
      )}
    </button>
  );
};
