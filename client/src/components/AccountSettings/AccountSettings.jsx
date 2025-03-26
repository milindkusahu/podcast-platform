import React from "react";
import { ArrowLeftIcon } from "../../utils/icons";
import styles from "./AccountSettings.module.css";
import Button from "../Button/Button";

const AccountSettings = ({ user, onBack }) => {
  const { username, email, avatar } = user;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <ArrowLeftIcon width={30} height={30} color="#1d1929" />
          <span>Account Settings</span>
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.profileSection}>
          <div className={styles.avatarContainer}>
            <img
              src={avatar || "./avatar.png"}
              alt="User Avatar"
              className={styles.avatar}
            />
          </div>

          <div className={styles.formGroups}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="username" className={styles.label}>
                  User Name
                </label>
                <input
                  type="text"
                  id="username"
                  className={styles.input}
                  defaultValue={username}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={styles.input}
                  defaultValue={email}
                />
              </div>
            </div>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Subscriptions</h2>

        <div className={styles.subscriptionBox}>
          <div className={styles.subscriptionMessage}>
            <span className={styles.oops}>Oops! </span>
            <span>You don't have any active plans. </span>
            <span className={styles.upgradeText}>Upgrade now!</span>
          </div>
          <Button
            bgColor="#7e22ce"
            textColor="white"
            className={styles.upgradeButton}
          >
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
