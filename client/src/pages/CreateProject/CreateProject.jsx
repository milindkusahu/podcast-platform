import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import ProjectModal from "../../components/ProjectModal/ProjectModal";
import { PlusIcon } from "../../utils/icons";
import styles from "./CreateProject.module.css";
import SEO from "../../components/SEO/SEO";

const CreateProject = ({ onBack, onLogout, onCreateProject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenCreateModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitProject = (projectName) => {
    setIsModalOpen(false);

    if (onCreateProject) {
      onCreateProject(projectName);
    }
  };

  return (
    <div className={styles.container}>
      <SEO
        title="Create New Project"
        description="Create a new podcast project in Ques.AI to organize your content and episodes."
        keywords={[
          "project creation",
          "podcast organization",
          "content management",
          "new project",
        ]}
      />
      <Header onLogout={onLogout} />
      <main className={styles.main}>
        <h1 className={styles.title}>Create a New Project</h1>

        <div className={styles.contentContainer}>
          <div className={styles.illustrationContainer}>
            <img
              src="./podcast-illustration.svg"
              alt="Podcast collaboration"
              className={styles.illustration}
            />
          </div>

          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in
          </p>

          <div className={styles.buttonContainer}>
            <Button
              bgColor="#1F1735"
              textColor="#FFFFFF"
              icon={<PlusIcon color="white" width={23} height={23} />}
              onClick={handleOpenCreateModal}
            >
              Create New Project
            </Button>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <ProjectModal
          onClose={handleCloseModal}
          onSubmit={handleSubmitProject}
        />
      )}
    </div>
  );
};

export default CreateProject;
