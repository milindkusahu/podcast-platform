import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { projectService } from "../api/projectService";
import toast from "react-hot-toast";

const ProjectContext = createContext(null);

export const useProjects = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProjects = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setLoading(true);
      const projectsData = await projectService.getAllProjects();

      const formattedProjects = projectsData.map((project) => ({
        id: project._id,
        name: project.title,
        description: project.description,
        files: project.episodeCount || 0,
        lastEdited: formatDate(project.lastEdited),
        initials: getInitials(project.title),
        color: getRandomColor(),
      }));

      setProjects(formattedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = async (projectName) => {
    try {
      setLoading(true);
      const projectData = {
        title: projectName,
        description: "",
      };

      const newProject = await projectService.createProject(projectData);

      const formattedProject = {
        id: newProject._id,
        name: newProject.title,
        description: newProject.description,
        files: 0,
        lastEdited: formatDate(newProject.lastEdited || newProject.createdAt),
        initials: getInitials(newProject.title),
        color: getRandomColor(),
      };

      setProjects([...projects, formattedProject]);
      toast.success("Project created successfully!");
      navigate("/projects");
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectProject = (project) => {
    setSelectedProject(project);
    navigate(`/projects/${project.id}/podcasts`);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const getRandomColor = () => {
    const colors = ["#FFA500", "#4CAF50", "#2196F3", "#9C27B0", "#F44336"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const formatDate = (dateString) => {
    if (!dateString) return "just now";

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "today";
    } else if (diffDays === 1) {
      return "yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  const value = {
    projects,
    selectedProject,
    loading,
    createProject,
    selectProject,
    setSelectedProject,
    refreshProjects: fetchProjects,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export default ProjectContext;
