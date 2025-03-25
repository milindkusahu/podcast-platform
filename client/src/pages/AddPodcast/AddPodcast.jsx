import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import PodcastSourceCard from "../../components/PodcastSourceCard/PodcastSourceCard";
import RSSFeedModal from "../../components/modals/RSSFeedModal/RSSFeedModal";
import YouTubeUploadModal from "../../components/modals/YouTubeUploadModal/YouTubeUploadModal";
import UploadFilesModal from "../../components/modals/UploadFilesModal/UploadFilesModal";
import FilesTable from "../../components/FilesTable/FilesTable";
import EditTranscript from "../../components/EditTranscript/EditTranscript";
import {
  NotificationIcon2,
  HomeIcon,
  UploadIcon,
  LogoutIcon,
  ArrowLeftIcon,
} from "../../utils/icons";
import styles from "./AddPodcast.module.css";
import Button from "../../components/common/Button/Button";

const AddPodcast = ({ projectName = "Sample Project", onBack, onLogout }) => {
  const [showYouTubeModal, setShowYouTubeModal] = useState(false);
  const [showRSSModal, setShowRSSModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeUploadAction, setActiveUploadAction] = useState(null);
  const [viewingTranscript, setViewingTranscript] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: "file-1",
      name: "THE SIDEPOD S2 EPISODE 15",
      uploadDate: "25 Oct 23 | 09:04",
      transcript: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni`,
    },
    {
      id: "file-2",
      name: "THE SIDEPOD S2 EPISODE 17",
      uploadDate: "27 Oct 23 | 11:08",
      transcript: "This is the transcript for episode 17",
    },
    {
      id: "file-3",
      name: "THE SIDEPOD S2 EPISODE 20",
      uploadDate: "31 Oct 23 | 20:28",
      transcript: "This is the transcript for episode 20",
    },
  ]);

  const breadcrumbItems = [
    { label: "Home Page", path: "/" },
    { label: projectName, path: "#", onClick: onBack },
    { label: "Add your podcast", path: "#" },
  ];

  const handleRSSSelect = () => {
    setShowRSSModal(true);
  };

  const handleYouTubeSelect = () => {
    setShowYouTubeModal(true);
  };

  const handleUploadSelect = () => {
    setActiveUploadAction("upload");
    setShowUploadModal(true);
  };

  const handleFileUpload = (data) => {
    const newFile = {
      id: `file-${Date.now()}`,
      name: data.name,
      transcript: data.transcript || "",
      uploadDate: new Date()
        .toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace(",", " |"),
    };

    setUploadedFiles([...uploadedFiles, newFile]);
    setShowUploadModal(false);
  };

  const handleYouTubeUpload = (data) => {
    const newFile = {
      id: `yt-${Date.now()}`,
      name: data.name,
      transcript: data.transcript || "",
      uploadDate: new Date()
        .toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace(",", " |"),
    };

    setUploadedFiles([...uploadedFiles, newFile]);
    setShowYouTubeModal(false);
  };

  const handleRSSUpload = (data) => {
    const newFile = {
      id: `rss-${Date.now()}`,
      name: data.name,
      transcript: data.transcript || "",
      uploadDate: new Date()
        .toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace(",", " |"),
    };

    setUploadedFiles([...uploadedFiles, newFile]);
    setShowRSSModal(false);
  };

  const handleViewFile = (file) => {
    setSelectedFile(file);
    setViewingTranscript(true);
  };

  const handleDeleteFile = (file) => {
    console.log("Deleting file:", file);
    setUploadedFiles(uploadedFiles.filter((f) => f.id !== file.id));

    if (selectedFile && selectedFile.id === file.id) {
      setViewingTranscript(false);
      setSelectedFile(null);
    }
  };

  const handleSaveTranscript = (updatedTranscript) => {
    const updatedFiles = uploadedFiles.map((file) => {
      if (file.id === selectedFile.id) {
        return { ...file, transcript: updatedTranscript };
      }
      return file;
    });

    setUploadedFiles(updatedFiles);
    setSelectedFile({ ...selectedFile, transcript: updatedTranscript });
  };

  const handleBackFromTranscript = () => {
    setViewingTranscript(false);
    setSelectedFile(null);
  };

  const renderSourceCards = () => (
    <div className={styles.cardsContainer}>
      <PodcastSourceCard
        title="RSS Feed"
        description="Lorem ipsum dolor sit. Dolor lorem sit."
        icon={<img src="./rss.png" alt="RSS Feed" width="64" height="64" />}
        onClick={handleRSSSelect}
      />

      <PodcastSourceCard
        title="Youtube Video"
        description="Lorem ipsum dolor sit. Dolor lorem sit."
        icon={
          <img src="./youtube.png" alt="YouTube Video" width="64" height="64" />
        }
        onClick={handleYouTubeSelect}
      />

      <PodcastSourceCard
        title="Upload Files"
        description="Lorem ipsum dolor sit. Dolor lorem sit."
        icon={
          <img src="./upload.png" alt="Upload Files" width="64" height="64" />
        }
        onClick={handleUploadSelect}
      />
    </div>
  );

  // Check if there are any files uploaded
  const hasUploadedFiles = uploadedFiles.length > 0;

  return (
    <div className={styles.pageContainer}>
      <Sidebar onLogout={onLogout} />

      <main className={styles.content}>
        <div className={styles.header}>
          <Breadcrumb items={breadcrumbItems} />

          <div className={styles.headerIcons}>
            <button className={styles.iconButton}>
              <NotificationIcon2 width={50} height={50} />
            </button>
            {onLogout && (
              <button className={styles.iconButton} onClick={onLogout}>
                <LogoutIcon width={50} height={50} />
              </button>
            )}
          </div>
        </div>

        {viewingTranscript && selectedFile ? (
          <EditTranscript
            transcript={selectedFile.transcript}
            onBack={handleBackFromTranscript}
            onSave={handleSaveTranscript}
          />
        ) : (
          <>
            <h1 className={styles.pageTitle}>Add Podcast</h1>

            {renderSourceCards()}

            {!hasUploadedFiles && (
              <div className={styles.fileDropContainer}>
                <UploadIcon
                  width={100}
                  height={100}
                  color="var(--primary-color)"
                />
                <div className={styles.dropText}>
                  <h3>
                    Select a file or drag and drop here (Podcast Media or
                    Transcription Text)
                  </h3>
                  <p>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file</p>
                </div>

                <Button
                  bgColor="transparent"
                  textColor="#7e22ce"
                  strokeColor="#7e22ce"
                  hoverBgColor="#7e22ce"
                  hoverTextColor="white"
                  radius="50px"
                  className={styles.selectFileButton}
                >
                  Select File
                </Button>
              </div>
            )}

            <FilesTable
              files={uploadedFiles}
              onView={handleViewFile}
              onDelete={handleDeleteFile}
            />
          </>
        )}
      </main>

      {showYouTubeModal && (
        <YouTubeUploadModal
          onClose={() => setShowYouTubeModal(false)}
          onUpload={handleYouTubeUpload}
        />
      )}

      {showRSSModal && (
        <RSSFeedModal
          onClose={() => setShowRSSModal(false)}
          onUpload={handleRSSUpload}
        />
      )}

      {showUploadModal && (
        <UploadFilesModal
          onClose={() => setShowUploadModal(false)}
          onUpload={handleFileUpload}
        />
      )}
    </div>
  );
};

export default AddPodcast;
