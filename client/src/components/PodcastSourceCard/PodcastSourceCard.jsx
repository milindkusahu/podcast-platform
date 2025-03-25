import React from "react";
import styles from "./PodcastSourceCard.module.css";

const PodcastSourceCard = ({ title, description, icon, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.iconContainer}>{icon}</div>
    </div>
  );
};

export default PodcastSourceCard;
