import React from "react";
import PropTypes from "prop-types";

export const ChevronDown = ({ className = "" }) => {
  return (
    <svg
      className={`chevron-down ${className}`}
      fill="none"
      height="16"
      viewBox="0 0 24 24"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

ChevronDown.propTypes = {
  className: PropTypes.string,
};
