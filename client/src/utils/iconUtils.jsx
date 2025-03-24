import React from "react";

export const createIcon = (svgPath, viewBox = "0 0 24 24") => {
  const IconComponent = ({
    width = 24,
    height = 24,
    color = "currentColor",
    className = "",
    style = {},
    onClick,
    ...props
  }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      stroke={color}
      className={className}
      style={{ color, ...style }}
      onClick={onClick}
      {...props}
    >
      {svgPath}
    </svg>
  );
  return IconComponent;
};
