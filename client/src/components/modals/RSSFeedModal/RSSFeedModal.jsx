import React, { useState } from "react";
import Button from "../../../components/Button/Button";
import styles from "./RSSFeedModal.module.css";
import IMAGES from "../../../config/paths";

const RSSFeedModal = ({ onClose, onUpload }) => {
  const [name, setName] = useState("");
  const [transcript, setTranscript] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpload) {
      onUpload({ name, transcript });
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.titleContainer}>
            <div className={styles.logoContainer}>
              <img src={IMAGES.RSS} alt="RSS Feed" width="40" height="40" />
            </div>
            <h2 className={styles.modalTitle}>Upload from RSS Feed</h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              placeholder="Enter RSS feed URL"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="transcript" className={styles.label}>
              Transcript
            </label>
            <textarea
              id="transcript"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className={styles.textarea}
              placeholder="Enter transcript (optional)"
              rows={6}
            />
          </div>

          <div className={styles.buttonContainer}>
            <Button type="submit" bgColor="#1F1735" textColor="white">
              Upload
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RSSFeedModal;
