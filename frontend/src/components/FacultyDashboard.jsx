import { useEffect, useState } from "react";
import api from "../api";

function FacultyDashboard({ setPage }) {

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadInternships = () => {

    api.get("/faculty/internships")
      .then((response) => {
        setInternships(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to load internships");
        setLoading(false);
      });

  };

  useEffect(() => {
    loadInternships();
  }, []);

  const approveInternship = (id) => {

    api.put("/faculty/internships/" + id + "/approve")
      .then((response) => {

        alert(response.data.message);

        loadInternships();

      })
      .catch((error) => {

        console.log(error);
        alert("Unable to approve internship");

      });

  };

  const rejectInternship = (id) => {

    const reason = window.prompt(
      "Enter rejection reason:"
    );

    if (reason === null) {
      return;
    }

    if (reason.trim() === "") {
      alert("Please enter rejection reason");
      return;
    }

    api.put(
      "/faculty/internships/" + id + "/reject",
      {
        rejectionReason: reason
      }
    )
    .then((response) => {

      alert(response.data.message);

      loadInternships();

    })
    .catch((error) => {

      console.log(error);
      alert("Unable to reject internship");

    });

  };

  const logout = () => {

    localStorage.removeItem("facultyEmail");
    localStorage.removeItem("facultyName");

    setPage("login");

  };

  return (
    <div className="faculty-dashboard">

      <h1>Faculty Dashboard</h1>

      <h2>
        Welcome, {localStorage.getItem("facultyName")}
      </h2>

      {loading && (
        <p style={{ textAlign: "center" }}>
          Loading internships...
        </p>
      )}

      {!loading && internships.length === 0 && (
        <p style={{ textAlign: "center" }}>
          No internships submitted yet.
        </p>
      )}

      {!loading && internships.length > 0 && (

        <div>

          {internships.map((internship) => (

            <div
              className="internship-card"
              key={internship._id}
            >

              <h3>
                {internship.companyName}
              </h3>

              <p>
                <b>Student Email:</b>{" "}
                {internship.studentEmail}
              </p>

              <p>
                <b>Role:</b>{" "}
                {internship.role}
              </p>

              <p>
                <b>Start Date:</b>{" "}
                {internship.startDate}
              </p>

              <p>
                <b>End Date:</b>{" "}
                {internship.endDate}
              </p>

              <p>
                <b>Status:</b>{" "}
                {internship.status}
              </p>

              {internship.status === "Rejected" && (
                <p>
                  <b>Rejection Reason:</b>{" "}
                  {internship.rejectionReason}
                </p>
              )}

              {internship.status === "Pending" && (

                <div>

                  <button
                    type="button"
                    onClick={() =>
                      approveInternship(internship._id)
                    }
                  >
                    Approve
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      rejectInternship(internship._id)
                    }
                  >
                    Reject
                  </button>

                </div>

              )}

            </div>

          ))}

        </div>

      )}

      <div style={{ textAlign: "center" }}>

        <button
          type="button"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default FacultyDashboard;