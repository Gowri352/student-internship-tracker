import { useState } from "react";
import api from "../api";

function FacultyLogin({ setPage }) {

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailPattern =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const handleSubmit = (e) => {

    e.preventDefault();

    // Faculty Create Account validation
    if (!isLogin && name.trim() === "") {
      alert("Please enter your name");
      return;
    }

    // Email validation
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    // Password validation
    if (password.trim() === "") {
      alert("Please enter password");
      return;
    }

    // =====================================
    // FACULTY LOGIN
    // =====================================

    if (isLogin) {

      api.post("/faculty/login", {
        email: email,
        password: password
      })

      .then((response) => {

        alert(response.data.message);

        localStorage.setItem(
          "facultyEmail",
          response.data.faculty.email
        );

        localStorage.setItem(
          "facultyName",
          response.data.faculty.name
        );

        setPage("facultyDashboard");

      })

      .catch((error) => {

        console.log(error);

        if (error.response) {

          alert(error.response.data.message);

        } else {

          alert("Unable to connect to backend");

        }

      });

    }

    // =====================================
    // FACULTY CREATE ACCOUNT
    // =====================================

    else {

      api.post("/faculty/signup", {
        name: name,
        email: email,
        password: password
      })

      .then((response) => {

        alert(response.data.message);

        // Go back to Faculty Login
        setIsLogin(true);

        setName("");
        setEmail("");
        setPassword("");

      })

      .catch((error) => {

        console.log(error);

        if (error.response) {

          alert(error.response.data.message);

        } else {

          alert("Unable to connect to backend");

        }

      });

    }

  };

  return (

    <div className="login-container">

      <form
        className="login-card"
        onSubmit={handleSubmit}
      >

        <h2>
          Student Internship Tracker
        </h2>

        <h3>
          {isLogin
            ? "Faculty Login"
            : "Create Faculty Account"}
        </h3>


        {/* FACULTY NAME */}

        {!isLogin && (

          <input
            type="text"
            placeholder="Enter Faculty Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

        )}


        {/* EMAIL */}

        <input
          type="email"
          placeholder="Enter Faculty Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />


        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />


        {/* MAIN BUTTON */}

        <button type="submit">

          {isLogin
            ? "Faculty Login"
            : "Create Faculty Account"}

        </button>


        {/* LOGIN / CREATE ACCOUNT SWITCH */}

        <p>

          {isLogin
            ? "Don't have a faculty account? "
            : "Already have a faculty account? "}

          <span
            onClick={() => {

              setIsLogin(!isLogin);

              setName("");
              setEmail("");
              setPassword("");

            }}
          >

            {isLogin
              ? "Create Account"
              : "Login"}

          </span>

        </p>


        {/* BACK TO STUDENT LOGIN */}

        <button
          type="button"
          onClick={() => setPage("login")}
        >
          Back to Student Login
        </button>

      </form>

    </div>

  );
}

export default FacultyLogin;