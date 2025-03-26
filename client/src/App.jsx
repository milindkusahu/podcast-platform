import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import CreateProject from "./pages/CreateProject/CreateProject";
import Projects from "./pages/Projects/Projects";
import AddPodcast from "./pages/AddPodcast/AddPodcast";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import { useProjects } from "./context/ProjectContext";
import ProjectRouteHelper from "./components/ProjectRouteHelper/ProjectRouteHelper";
import SEO from "./components/SEO/SEO";
import { Toaster } from "react-hot-toast";

function App() {
  const { isLoggedIn, logout } = useAuth();
  const {
    projects,
    createProject,
    selectProject,
    selectedProject,
    setSelectedProject,
    loading,
  } = useProjects();

  return (
    <div className="app">
      <SEO />

      <Toaster position="bottom-center" />

      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/create-project" /> : <Welcome />}
        />

        <Route
          path="/create-project"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              {!loading && projects.length > 0 ? (
                <Navigate to="/projects" />
              ) : (
                <CreateProject
                  onCreateProject={createProject}
                  onLogout={logout}
                />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Projects onLogout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:projectId/podcasts"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ProjectRouteHelper
                projects={projects}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
              >
                <AddPodcast
                  projectName={
                    selectedProject ? selectedProject.name : "Sample Project"
                  }
                  onLogout={logout}
                />
              </ProjectRouteHelper>
            </ProtectedRoute>
          }
        />

        {/* Redirect any unknown paths to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
