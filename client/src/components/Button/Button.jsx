import React, { useState } from "react";
import styles from "./Button.module.css";

const Button = ({
  icon,
  fullWidth = false,
  bgColor,
  textColor,
  strokeColor,
  radius,
  hoverBgColor,
  hoverTextColor,
  hoverStrokeColor,
  children,
  onClick,
  disabled = false,
  className = "",
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const customStyle = {
    backgroundColor: isHovered && hoverBgColor ? hoverBgColor : bgColor,
    color: isHovered && hoverTextColor ? hoverTextColor : textColor,
    borderRadius: radius,
    border: strokeColor
      ? `1px solid ${
          isHovered && hoverStrokeColor ? hoverStrokeColor : strokeColor
        }`
      : "none",
    transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
  };

  const buttonClasses = [
    styles.button,
    fullWidth ? styles.fullWidth : "",
    icon ? styles.withIcon : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      style={customStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      {icon && <span className={styles.iconWrapper}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
