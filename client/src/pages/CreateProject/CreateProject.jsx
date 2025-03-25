import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/common/Button/Button";
import ProjectModal from "../../components/ProjectModal/ProjectModal";
import { AddIcon } from "../../utils/icons";
import styles from "./CreateProject.module.css";

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
              icon={<AddIcon color="white" width={16} height={16} />}
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
