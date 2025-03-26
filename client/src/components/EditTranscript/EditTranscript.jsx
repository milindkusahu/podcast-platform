import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from "../../utils/icons";
import styles from "./EditTranscript.module.css";
import Button from "../Button/Button";
import SEO from "../SEO/SEO";

const EditTranscript = ({ transcript, onBack, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTranscript, setEditedTranscript] = useState(transcript);
  const [originalTranscript, setOriginalTranscript] = useState(transcript);

  useEffect(() => {
    setEditedTranscript(transcript);
    setOriginalTranscript(transcript);
  }, [transcript]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setOriginalTranscript(editedTranscript);
    if (onSave) {
      onSave(editedTranscript);
    }
  };

  const handleDiscard = () => {
    setIsEditing(false);
    setEditedTranscript(originalTranscript);
  };

  const handleChange = (e) => {
    setEditedTranscript(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <SEO
        title="Edit Transcript"
        description="Edit podcast episode transcript"
        keywords={["transcript", "edit", "content"]}
      />
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <ArrowLeftIcon width={35} height={35} color="#1D1929" />
          <span>Edit Transcript</span>
        </button>

        <div className={styles.actions}>
          {isEditing ? (
            <>
              <Button
                onClick={handleDiscard}
                bgColor="transparent"
                textColor="#F44336"
                strokeColor="#F44336"
                className={styles.discardButton}
              >
                Discard
              </Button>
              <Button
                onClick={handleSave}
                bgColor="#1F1735"
                textColor="white"
                className={styles.saveButton}
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              onClick={handleEdit}
              bgColor="#1F1735"
              textColor="white"
              className={styles.editButton}
            >
              Edit
            </Button>
          )}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.transcriptSection}>
            <div className={styles.speakerHeader}>
              <h3 className={styles.speakerLabel}>Speaker</h3>
            </div>

            {isEditing ? (
              <textarea
                className={styles.transcriptTextarea}
                value={editedTranscript}
                onChange={handleChange}
              />
            ) : (
              <div className={styles.transcriptText}>{editedTranscript}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTranscript;
