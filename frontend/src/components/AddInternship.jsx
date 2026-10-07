import { useState } from "react";
import api from "../api";

function AddInternship({ setPage }) {

  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (companyName === "") {
      alert("Please enter company name");
      return;
    }

    if (role === "") {
      alert("Please enter internship role");
      return;
    }

    if (startDate === "") {
      alert("Please select start date");
      return;
    }

    if (endDate === "") {
      alert("Please select end date");
      return;
    }

    const studentEmail = localStorage.getItem("studentEmail");

    if (!studentEmail) {
      alert("Please login again");
      setPage("login");
      return;
    }

    api.post("/internships", {

      studentEmail: studentEmail,

      companyName: companyName,

      role: role,

      startDate: startDate,

      endDate: endDate

    })
    .then((response) => {

      alert(response.data.message);

      setCompanyName("");
      setRole("");
      setStartDate("");
      setEndDate("");

      setPage("dashboard");

    })
    .catch((error) => {

      console.log(error);

      if (error.response) {

        alert(error.response.data.message);

      } else {

        alert("Unable to connect to backend");

      }

    });

  };


  return (

    <div className="login-container">

      <div className="login-card">

        <h2>Add Internship</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) =>
              setCompanyName(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Internship Role"
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          />

          <label>Start Date</label>

          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(e.target.value)
            }
          />

          <label>End Date</label>

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(e.target.value)
            }
          />

          <button type="submit">
            Save Internship
          </button>

        </form>

        <button
          type="button"
          onClick={() => setPage("dashboard")}
        >
          Back
        </button>

      </div>

    </div>

  );
}

export default AddInternship;