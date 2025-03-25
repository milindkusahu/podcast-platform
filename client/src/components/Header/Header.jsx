import React, { useState } from "react";
import {
  ColorLogo,
  SettingsIcon,
  NotificationIcon,
  LogoutIcon,
} from "../../utils/icons";
import styles from "./Header.module.css";

const Header = ({ onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <ColorLogo width={160} height={40} />
      </div>
      <div className={styles.iconContainer}>
        <button className={styles.iconButton}>
          <SettingsIcon width={24} height={24} color="#333" />
        </button>
        <button className={styles.iconButton}>
          <NotificationIcon width={24} height={24} color="#333" />
        </button>

        {onLogout && (
          <button
            className={`${styles.iconButton} ${styles.logoutButton}`}
            onClick={handleLogout}
            title="Logout"
          >
            <LogoutIcon width={24} height={24} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
