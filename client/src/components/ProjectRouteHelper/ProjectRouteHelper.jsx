import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// This component helps with handling route parameters for project-related routes
const ProjectRouteHelper = ({
  projects,
  selectedProject,
  setSelectedProject,
  children,
}) => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // If we have a projectId from the URL but no selectedProject
    // or the selected project doesn't match the URL parameter
    if (projectId && (!selectedProject || selectedProject.id !== projectId)) {
      // Find the project matching the URL parameter
      const project = projects.find((p) => p.id === projectId);

      if (project) {
        // If found, update the selected project
        setSelectedProject(project);
      } else {
        // If not found, redirect to projects page
        navigate("/projects");
      }
    }
  }, [projectId, projects, selectedProject, setSelectedProject, navigate]);

  // Clone the child element and pass the selected project
  return children;
};

export default ProjectRouteHelper;
