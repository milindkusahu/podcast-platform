import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import ProjectModal from "../../components/ProjectModal/ProjectModal";
import { PlusIcon } from "../../utils/icons";
import styles from "./Projects.module.css";
import { useProjects } from "../../context/ProjectContext";
import { Toaster } from "react-hot-toast";
import SEO from "../../components/SEO/SEO";

const Projects = ({ onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { projects, loading, createProject, selectProject } = useProjects();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProject = (projectName) => {
    setIsModalOpen(false);
    createProject(projectName);
  };

  const handleProjectClick = (project) => {
    selectProject(project);
  };

  const renderProjectsGrid = () => {
    if (loading) {
      return <div className={styles.message}>Loading projects...</div>;
    }

    if (projects.length === 0) {
      return (
        <div className={styles.message}>
          No projects yet. Create your first project!
        </div>
      );
    }

    return (
      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <div
            key={project.id}
            className={styles.projectCard}
            onClick={() => handleProjectClick(project)}
          >
            <div
              className={styles.projectIcon}
              style={{ backgroundColor: project.color }}
            >
              <span className={styles.initials}>{project.initials}</span>
            </div>
            <div className={styles.projectInfo}>
              <h3 className={styles.projectName}>{project.name}</h3>
              <p className={styles.projectFiles}>{project.files} Files</p>
              <p className={styles.projectLastEdited}>
                Last edited {project.lastEdited}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <SEO
        title="My Projects"
        description="Manage your podcast projects and organize your content in one place."
        keywords={[
          "projects",
          "podcast management",
          "content organization",
          "podcast projects",
        ]}
      />

      <Toaster position="top-right" />
      <Header onLogout={onLogout} />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Projects</h1>
          <Button
            bgColor="#1F1735"
            textColor="#FFFFFF"
            icon={<PlusIcon color="white" width={23} height={23} />}
            onClick={handleOpenModal}
            className={styles.createButton}
            disabled={loading}
          >
            Create New Project
          </Button>
        </div>

        {renderProjectsGrid()}
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
