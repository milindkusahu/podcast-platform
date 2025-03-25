import React, { useState } from "react";
import Welcome from "./pages/Welcome/Welcome";
import CreateProject from "./pages/CreateProject/CreateProject";
import Projects from "./pages/Projects/Projects";
import AddPodcast from "./pages/AddPodcast/AddPodcast";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleLogin = (userData) => {
    console.log("Logged in with:", userData);
    setIsLoggedIn(true);
    setCurrentPage("createProject");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
  };

  const handleCreateProject = (projectName) => {
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
    setCurrentPage("projects");
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setCurrentPage("addPodcast");
  };

  const getRandomColor = () => {
    const colors = ["#FFA500", "#4CAF50", "#2196F3", "#9C27B0", "#F44336"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const renderPage = () => {
    if (!isLoggedIn) {
      return <Welcome onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case "createProject":
        return (
          <CreateProject
            onBack={() => setCurrentPage("projects")}
            onLogout={handleLogout}
            onCreateProject={handleCreateProject}
          />
        );
      case "projects":
        return (
          <Projects
            projects={projects}
            onNewProject={() => setCurrentPage("createProject")}
            onSelectProject={handleSelectProject}
            onLogout={handleLogout}
            onCreateProject={handleCreateProject}
          />
        );
      case "addPodcast":
        return (
          <AddPodcast
            projectName={
              selectedProject ? selectedProject.name : "Sample Project"
            }
            onBack={() => setCurrentPage("projects")}
            onLogout={handleLogout}
          />
        );
      default:
        return (
          <CreateProject
            onBack={() => setCurrentPage("projects")}
            onLogout={handleLogout}
            onCreateProject={handleCreateProject}
          />
        );
    }
  };

  return <div className="app">{renderPage()}</div>;
}

export default App;
