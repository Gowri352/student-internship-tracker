import { useEffect, useState } from "react";
import api from "../api";

function InternshipList({ setPage }) {

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const studentEmail = localStorage.getItem("studentEmail");

    if (!studentEmail) {
      alert("Please login again");
      setPage("login");
      return;
    }

    api.get("/internships/student/" + studentEmail)

      .then((response) => {

        setInternships(response.data);

        setLoading(false);

      })

      .catch((error) => {

        console.log(error);

        alert("Unable to connect to backend");

        setLoading(false);

      });

  }, [setPage]);


  const deleteInternship = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this internship?"
    );

    if (!confirmDelete) {
      return;
    }

    api.delete("/internships/" + id)

      .then((response) => {

        alert(response.data.message);

        setInternships(
          internships.filter(
            (internship) => internship._id !== id
          )
        );

      })

      .catch((error) => {

        console.log(error);

        alert("Unable to delete internship");

      });

  };


  return (

    <div className="login-container">

      <div className="login-card">

        <h2>My Internships</h2>


        {loading && (
          <p>Loading internships...</p>
        )}


        {!loading && internships.length === 0 && (

          <p>
            No internships added yet.
          </p>

        )}


        {!loading && internships.length > 0 && (

          <div>

            {internships.map((internship) => (

              <div
                key={internship._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "15px",
                  marginBottom: "15px",
                  textAlign: "left"
                }}
              >

                <h3>
                  {internship.companyName}
                </h3>

                <p>
                  <b>Role:</b> {internship.role}
                </p>

                <p>
                  <b>Start Date:</b> {internship.startDate}
                </p>

                <p>
                  <b>End Date:</b> {internship.endDate}
                </p>

                <p>
                  <b>Status:</b> {internship.status}
                </p>


                {internship.status === "Rejected" && (

                  <p>
                    <b>Rejection Reason:</b>{" "}
                    {internship.rejectionReason}
                  </p>

                )}


                <button
                  type="button"
                  onClick={() =>
                    deleteInternship(internship._id)
                  }
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        )}


        <button
          type="button"
          onClick={() => setPage("dashboard")}
        >
          Back to Dashboard
        </button>

      </div>

    </div>

  );

}

export default InternshipList;