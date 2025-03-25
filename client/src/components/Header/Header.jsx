import React from "react";
import { ColorLogo, SettingsIcon, NotificationIcon } from "../../utils/icons";
import styles from "./Header.module.css";

const Header = ({ onLogout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <ColorLogo width={260} height={50} />
      </div>
      <div className={styles.iconContainer}>
        <button className={styles.iconButton}>
          <SettingsIcon width={35} height={35} color="#333" />
        </button>
        <button className={styles.iconButton}>
          <NotificationIcon width={35} height={35} color="#333" />
        </button>
      </div>
    </header>
  );
};

export default Header;
