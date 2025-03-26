import React, { useState } from "react";
import { ArrowLeftIcon } from "../../utils/icons";
import styles from "./AccountSettings.module.css";
import Button from "../Button/Button";
import { useAuth } from "../../context/AuthContext";
import IMAGES from "../../config/paths";

const AccountSettings = ({ onBack }) => {
  const { user, updateProfile, loading } = useAuth();

  const [formData, setFormData] = useState({
    username: user?.username || "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      username: user?.username || "",
    });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.username === user.username) {
      setIsEditing(false);
      return;
    }

    const success = await updateProfile({ username: formData.username });
    if (success) {
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <ArrowLeftIcon width={30} height={30} color="#1d1929" />
          <span>Account Settings</span>
        </button>
      </div>

      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <div className={styles.profileSection}>
            <div className={styles.avatarContainer}>
              <img
                src={user?.avatar || IMAGES.AVATAR}
                alt="User Avatar"
                className={styles.avatar}
              />
            </div>

            <div className={styles.formGroups}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="username" className={styles.label}>
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className={styles.input}
                    value={formData.username}
                    onChange={handleChange}
                    disabled={!isEditing || loading}
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
                    value={user?.email || ""}
                    disabled={true}
                  />
                </div>
              </div>

              {isEditing ? (
                <div className={styles.actionButtons}>
                  <Button
                    type="button"
                    bgColor="transparent"
                    textColor="#F44336"
                    strokeColor="#F44336"
                    className={styles.cancelButton}
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    bgColor="var(--primary-color)"
                    textColor="white"
                    className={styles.saveButton}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              ) : (
                <div className={styles.actionButtons}>
                  <Button
                    type="button"
                    bgColor="var(--primary-color)"
                    textColor="white"
                    className={styles.editButton}
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </Button>
                </div>
              )}
            </div>
          </div>
        </form>

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
