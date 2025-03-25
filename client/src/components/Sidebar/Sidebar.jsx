import React from "react";
import {
  AddIcon,
  ColorLogo,
  EditIcon,
  WidgetIcon,
  PremiumIcon,
  CollapseIcon,
  SettingsIcon,
} from "../../utils/icons";
import styles from "./Sidebar.module.css";

const Sidebar = ({ username = "Username", email = "username@gmail.com" }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <ColorLogo width={120} height={32} />
      </div>

      <nav className={styles.navigation}>
        <div className={`${styles.navItem} ${styles.activeNavItem}`}>
          <div className={styles.navIcon}>
            <AddIcon
              width={16}
              height={16}
              color="var(--primary-color)"
              stroke="var(--primary-color)"
            />
          </div>
          <span>Add your Podcast(s)</span>
        </div>

        <div className={styles.navItem}>
          <div className={styles.navIcon}>
            <EditIcon width={16} height={16} color="#555" />
          </div>
          <span>Create & Repurpose</span>
        </div>

        <div className={styles.navItem}>
          <div className={styles.navIcon}>
            <WidgetIcon width={16} height={16} color="#555" />
          </div>
          <span>Podcast Widget</span>
        </div>

        <div className={styles.navItem}>
          <div className={styles.navIcon}>
            <PremiumIcon width={16} height={16} color="#555" />
          </div>
          <span>Upgrade</span>
        </div>
      </nav>

      <div className={styles.divider}></div>

      <div className={styles.navItem}>
        <div className={styles.navIcon}>
          <SettingsIcon width={16} height={16} color="#555" />
        </div>
        <span>Help</span>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          <img src="./avatar.png" alt="User Avatar" />
        </div>
        <div className={styles.userDetails}>
          <div className={styles.username}>{username}</div>
          <div className={styles.email}>{email}</div>
        </div>
      </div>

      <button className={styles.collapseButton}>
        <CollapseIcon width={32} height={32} />
      </button>
    </aside>
  );
};

export default Sidebar;
