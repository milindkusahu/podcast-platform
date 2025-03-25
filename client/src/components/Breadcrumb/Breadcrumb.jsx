import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon } from "../../utils/icons";
import styles from "./Breadcrumb.module.css";

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className={styles.breadcrumb} aria-label="breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (index === 0) {
          return (
            <React.Fragment key={index}>
              {item.onClick ? (
                <a
                  onClick={item.onClick}
                  className={styles.item}
                  style={{ cursor: "pointer" }}
                >
                  <HomeIcon
                    width={20}
                    height={20}
                    className={styles.homeIcon}
                  />
                  <span>{item.label}</span>
                </a>
              ) : (
                <Link to={item.path} className={styles.item}>
                  <HomeIcon
                    width={20}
                    height={20}
                    className={styles.homeIcon}
                  />
                  <span>{item.label}</span>
                </Link>
              )}
              {index < items.length - 1 && (
                <span className={styles.separator}>/</span>
              )}
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={index}>
            {isLast ? (
              <span className={`${styles.item} ${styles.active}`}>
                {item.label}
              </span>
            ) : item.onClick ? (
              <a
                onClick={item.onClick}
                className={styles.item}
                style={{ cursor: "pointer" }}
              >
                {item.label}
              </a>
            ) : (
              <Link to={item.path} className={styles.item}>
                {item.label}
              </Link>
            )}
            {index < items.length - 1 && (
              <span className={styles.separator}>/</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
