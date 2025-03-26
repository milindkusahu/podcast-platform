import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import PodcastSourceCard from "../../components/PodcastSourceCard/PodcastSourceCard";
import RSSFeedModal from "../../components/modals/RSSFeedModal/RSSFeedModal";
import YouTubeUploadModal from "../../components/modals/YouTubeUploadModal/YouTubeUploadModal";
import UploadFilesModal from "../../components/modals/UploadFilesModal/UploadFilesModal";
import FilesTable from "../../components/FilesTable/FilesTable";
import EditTranscript from "../../components/EditTranscript/EditTranscript";
import AccountSettings from "../../components/AccountSettings/AccountSettings";
import { NotificationIcon2, UploadIcon, LogoutIcon } from "../../utils/icons";
import styles from "./AddPodcast.module.css";
import Button from "../../components/Button/Button";
import IMAGES from "../../config/paths";
import { episodeService } from "../../api/episodeService";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AddPodcast = ({ projectName = "Sample Project", onLogout }) => {
  const { projectId } = useParams();
  const { user } = useAuth();
  const [showYouTubeModal, setShowYouTubeModal] = useState(false);
  const [showRSSModal, setShowRSSModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeUploadAction, setActiveUploadAction] = useState(null);
  const [viewingTranscript, setViewingTranscript] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showingAccountSettings, setShowingAccountSettings] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const userData = {
    username: user?.username || "User",
    email: user?.email || "user@example.com",
    avatar: IMAGES.AVATAR,
  };

  useEffect(() => {
    if (projectId) {
      fetchEpisodes();
    }
  }, [projectId]);

  const fetchEpisodes = async () => {
    try {
      setLoading(true);
      const episodes = await episodeService.getEpisodesByProjectId(projectId);

      const formattedEpisodes = episodes.map((episode) => ({
        id: episode._id,
        name: episode.title,
        transcript: episode.transcript || "",
        uploadDate: formatDate(episode.createdAt),
        source: episode.source,
        sourceUrl: episode.sourceUrl || "",
      }));

      setUploadedFiles(formattedEpisodes);
    } catch (error) {
      console.error("Error fetching episodes:", error);
      toast.error("Failed to load episodes");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(",", " |");
  };

  const breadcrumbItems = [
    { label: "Home Page", path: "/projects" },
    { label: projectName, path: `/projects/${projectId}` },
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

  const handleFileUpload = async (data) => {
    try {
      setLoading(true);

      const episodeData = {
        title: data.name,
        project: projectId,
        source: "Manual",
        sourceUrl: "",
        transcript: data.transcript || "",
      };

      const newEpisode = await episodeService.createEpisode(episodeData);

      const formattedEpisode = {
        id: newEpisode._id,
        name: newEpisode.title,
        transcript: newEpisode.transcript || "",
        uploadDate: formatDate(newEpisode.createdAt),
        source: newEpisode.source,
        sourceUrl: newEpisode.sourceUrl || "",
      };

      setUploadedFiles([...uploadedFiles, formattedEpisode]);
      setShowUploadModal(false);
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file");
    } finally {
      setLoading(false);
    }
  };

  const handleYouTubeUpload = async (data) => {
    try {
      setLoading(true);

      const episodeData = {
        title: data.name,
        project: projectId,
        source: "YouTube",
        sourceUrl: data.name,
        transcript: data.transcript || "",
      };

      const newEpisode = await episodeService.createEpisode(episodeData);

      const formattedEpisode = {
        id: newEpisode._id,
        name: newEpisode.title,
        transcript: newEpisode.transcript || "",
        uploadDate: formatDate(newEpisode.createdAt),
        source: newEpisode.source,
        sourceUrl: newEpisode.sourceUrl,
      };

      setUploadedFiles([...uploadedFiles, formattedEpisode]);
      setShowYouTubeModal(false);
      toast.success("YouTube content added successfully");
    } catch (error) {
      console.error("Error adding YouTube content:", error);
      toast.error("Failed to add YouTube content");
    } finally {
      setLoading(false);
    }
  };

  const handleRSSUpload = async (data) => {
    try {
      setLoading(true);

      const episodeData = {
        title: data.name,
        project: projectId,
        source: "RSS",
        sourceUrl: data.name,
        transcript: data.transcript || "",
      };

      const newEpisode = await episodeService.createEpisode(episodeData);

      const formattedEpisode = {
        id: newEpisode._id,
        name: newEpisode.title,
        transcript: newEpisode.transcript || "",
        uploadDate: formatDate(newEpisode.createdAt),
        source: newEpisode.source,
        sourceUrl: newEpisode.sourceUrl,
      };

      setUploadedFiles([...uploadedFiles, formattedEpisode]);
      setShowRSSModal(false);
      toast.success("RSS feed added successfully");
    } catch (error) {
      console.error("Error adding RSS feed:", error);
      toast.error("Failed to add RSS feed");
    } finally {
      setLoading(false);
    }
  };

  const handleViewFile = (file) => {
    setSelectedFile(file);
    setViewingTranscript(true);
    setShowingAccountSettings(false);
  };

  const handleDeleteFile = async (file) => {
    try {
      setLoading(true);
      await episodeService.deleteEpisode(file.id);

      setUploadedFiles(uploadedFiles.filter((f) => f.id !== file.id));
      toast.success("Episode deleted successfully");

      if (selectedFile && selectedFile.id === file.id) {
        setViewingTranscript(false);
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Error deleting episode:", error);
      toast.error("Failed to delete episode");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTranscript = async (updatedTranscript) => {
    try {
      setLoading(true);

      await episodeService.updateEpisode(selectedFile.id, {
        transcript: updatedTranscript,
      });

      const updatedFiles = uploadedFiles.map((file) => {
        if (file.id === selectedFile.id) {
          return { ...file, transcript: updatedTranscript };
        }
        return file;
      });

      setUploadedFiles(updatedFiles);
      setSelectedFile({ ...selectedFile, transcript: updatedTranscript });
      toast.success("Transcript updated successfully");
    } catch (error) {
      console.error("Error updating transcript:", error);
      toast.error("Failed to update transcript");
    } finally {
      setLoading(false);
    }
  };

  const handleBackFromTranscript = () => {
    setViewingTranscript(false);
    setSelectedFile(null);
  };

  const handleUserClick = () => {
    setShowingAccountSettings(true);
    setViewingTranscript(false);
    setSelectedFile(null);
  };

  const handleBackFromSettings = () => {
    setShowingAccountSettings(false);
  };

  const renderSourceCards = () => (
    <div className={styles.cardsContainer}>
      <PodcastSourceCard
        title="RSS Feed"
        description="Import podcast episodes directly from an RSS feed."
        icon={<img src={IMAGES.RSS} alt="RSS Feed" width="64" height="64" />}
        onClick={handleRSSSelect}
      />

      <PodcastSourceCard
        title="Youtube Video"
        description="Import content from YouTube videos with automatic transcription."
        icon={
          <img
            src={IMAGES.YOUTUBE}
            alt="YouTube Video"
            width="64"
            height="64"
          />
        }
        onClick={handleYouTubeSelect}
      />

      <PodcastSourceCard
        title="Upload Files"
        description="Upload audio, video, or transcript files directly."
        icon={
          <img src={IMAGES.UPLOAD} alt="Upload Files" width="64" height="64" />
        }
        onClick={handleUploadSelect}
      />
    </div>
  );

  // Check if there are any files uploaded
  const hasUploadedFiles = uploadedFiles.length > 0;

  const renderMainContent = () => {
    if (showingAccountSettings) {
      return <AccountSettings onBack={handleBackFromSettings} />;
    }

    if (viewingTranscript && selectedFile) {
      return (
        <EditTranscript
          transcript={selectedFile.transcript}
          onBack={handleBackFromTranscript}
          onSave={handleSaveTranscript}
        />
      );
    }

    return (
      <>
        <h1 className={styles.pageTitle}>Add Podcast</h1>

        {renderSourceCards()}

        {loading && !hasUploadedFiles && (
          <div className={styles.loadingContainer}>Loading episodes...</div>
        )}

        {!loading && !hasUploadedFiles && (
          <div className={styles.fileDropContainer}>
            <UploadIcon width={100} height={100} color="var(--primary-color)" />
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
              onClick={handleUploadSelect}
            >
              Select File
            </Button>
          </div>
        )}

        <FilesTable
          files={uploadedFiles}
          onView={handleViewFile}
          onDelete={handleDeleteFile}
          loading={loading}
        />
      </>
    );
  };

  return (
    <div className={styles.pageContainer}>
      <Sidebar
        username={userData.username}
        email={userData.email}
        onUserClick={handleUserClick}
        onLogout={onLogout}
      />

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

        {renderMainContent()}
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
