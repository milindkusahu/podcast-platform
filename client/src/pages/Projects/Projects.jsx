import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/common/Button/Button";
import ProjectModal from "../../components/ProjectModal/ProjectModal";
import { AddIcon } from "../../utils/icons";
import styles from "./Projects.module.css";

const Projects = ({
  projects = [],
  onLogout,
  onNewProject,
  onCreateProject,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProject = (projectName) => {
    setIsModalOpen(false);

    if (onCreateProject) {
      onCreateProject(projectName);
    }
  };

  return (
    <div className={styles.container}>
      <Header onLogout={onLogout} />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Projects</h1>
          <Button
            bgColor="#1F1735"
            textColor="#FFFFFF"
            icon={<AddIcon color="white" width={16} height={16} />}
            onClick={handleOpenModal}
          >
            Create New Project
          </Button>
        </div>

        <div className={styles.projectsGrid}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <div
                  className={styles.projectIcon}
                  style={{ backgroundColor: project.color }}
                >
                  {project.initials}
                </div>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <p className={styles.projectFiles}>{project.files} Files</p>
                  <p className={styles.projectLastEdited}>
                    Last edited {project.lastEdited}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateContent}>
                <p className={styles.emptyStateText}>No projects yet</p>
                <p className={styles.emptyStateSubtext}>
                  Click "Create New Project" to get started
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {isModalOpen && (
        <ProjectModal
          onClose={handleCloseModal}
          onSubmit={handleCreateProject}
        />
      )}
    </div>
  );
};

export default Projects;
