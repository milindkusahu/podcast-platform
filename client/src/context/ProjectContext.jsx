import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const ProjectContext = createContext(null);

export const useProjects = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  const createProject = (projectName) => {
    const initials = projectName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    const newProject = {
      id: `project-${Date.now()}`,
      name: projectName,
      files: 0,
      lastEdited: "just now",
      initials,
      color: getRandomColor(),
    };

    setProjects([...projects, newProject]);
    navigate("/projects");
  };

  const selectProject = (project) => {
    setSelectedProject(project);
    navigate(`/projects/${project.id}/podcasts`);
  };

  const getRandomColor = () => {
    const colors = ["#FFA500", "#4CAF50", "#2196F3", "#9C27B0", "#F44336"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const value = {
    projects,
    selectedProject,
    createProject,
    selectProject,
    setSelectedProject,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export default ProjectContext;
