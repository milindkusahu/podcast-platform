import React from "react";
import styles from "./FilesTable.module.css";

const FilesTable = ({ files = [], onView, onDelete, loading = false }) => {
  if (loading) {
    return (
      <div className={styles.tableContainer}>
        <h2 className={styles.title}>Your Files</h2>
        <div className={styles.loadingMessage}>Loading files...</div>
      </div>
    );
  }

  if (!files || files.length === 0) {
    return null;
  }

  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.title}>Your Files</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.headerCell}>No.</th>
              <th className={styles.headerCell}>Name</th>
              <th className={styles.headerCell}>Upload Date & Time</th>
              <th className={styles.headerCell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={file.id} className={styles.tableRow}>
                <td className={styles.cell}>{index + 1}</td>
                <td className={styles.cell}>{file.name}</td>
                <td className={styles.cell}>{file.uploadDate}</td>
                <td className={styles.actionsCell}>
                  <div className={styles.actionButtons}>
                    <button
                      className={styles.viewButton}
                      onClick={() => onView && onView(file)}
                    >
                      View
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => onDelete && onDelete(file)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FilesTable;
