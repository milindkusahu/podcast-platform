import React from "react";
import { UploadIcon } from "../../utils/icons";
import styles from "./FileUpload.module.css";
import Button from "../common/Button/Button";

const FileUpload = ({
  icon,
  fileTypeDescription = "MP4, MOV, MP3, WAV, PDF, DOCX or TXT file",
}) => {
  return (
    <div className={styles.dropzone}>
      <div className={styles.icon}>
        {icon || (
          <UploadIcon width={200} height={200} color="var(--primary-color)" />
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>
          Select a file or drag and drop here (Podcast Media or Transcription
          Text)
        </h3>
        <p className={styles.description}>{fileTypeDescription}</p>
      </div>

      <button className={styles.selectButton}>Select File</button>
      <Button
        bgColor="transparent"
        textColor="#ea4335"
        strokeColor="#ea4335"
        hoverBgColor="#ea4335"
        hoverTextColor="white"
      >
        Select File
      </Button>
    </div>
  );
};

export default FileUpload;
