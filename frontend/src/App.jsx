import { useState } from "react";

import Login from "./components/Login";
import FacultyLogin from "./components/FacultyLogin";
import Dashboard from "./components/Dashboard";
import AddInternship from "./components/AddInternship";
import InternshipList from "./components/InternshipList";
import FacultyDashboard from "./components/FacultyDashboard";

import "./App.css";

function App() {

  const [page, setPage] = useState("login");

  return (

    <div>

      {page === "login" && (
        <Login setPage={setPage} />
      )}

      {page === "facultyLogin" && (
        <FacultyLogin setPage={setPage} />
      )}

      {page === "dashboard" && (
        <Dashboard setPage={setPage} />
      )}

      {page === "add" && (
        <AddInternship setPage={setPage} />
      )}

      {page === "view" && (
        <InternshipList setPage={setPage} />
      )}

      {page === "facultyDashboard" && (
        <FacultyDashboard setPage={setPage} />
      )}

    </div>

  );

}

export default App;