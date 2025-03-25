import React, { useState } from "react";
import Button from "../../components/common/Button/Button";
import styles from "./ProjectModal.module.css";

const ProjectModal = ({ onClose, onSubmit }) => {
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!projectName.trim()) {
      setError("Project Name Can't be empty");
      return;
    }

    onSubmit(projectName);
  };

  const handleChange = (e) => {
    setProjectName(e.target.value);
    if (e.target.value.trim()) {
      setError("");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Create Project</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="projectName" className={styles.label}>
              Enter Project Name:
            </label>
            <input
              id="projectName"
              type="text"
              value={projectName}
              onChange={handleChange}
              placeholder="Type here"
              className={styles.input}
            />
            {error && <p className={styles.errorText}>{error}</p>}
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <Button
              type="submit"
              bgColor="var(--primary-color)"
              textColor="white"
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
