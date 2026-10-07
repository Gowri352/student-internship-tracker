function Dashboard({ setPage }) {

  return (
    <div className="dashboard">

      <h1>Student Internship Tracker</h1>

      <h2>Welcome Student 🎉</h2>

      <p>Select an option below.</p>

      <button onClick={() => setPage("add")}>
        Add Internship
      </button>

      <button onClick={() => setPage("view")}>
        View Internship
      </button>

      <button onClick={() => setPage("login")}>
        Logout
      </button>

    </div>
  );

}

export default Dashboard;