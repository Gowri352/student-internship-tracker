import { useState } from "react";
import api from "../api";

function FacultyLogin({ setPage }) {

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Email validation
  const emailPattern =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  // Name validation - letters and spaces only
  const namePattern =
  /^[A-Za-z ]{3,}$/;

  const handleSubmit = (e) => {

    e.preventDefault();

    // Name validation for Create Account
    if (!isLogin) {

      if (name.trim() === "") {
        alert("Please enter your name");
        return;
      }

      if (!namePattern.test(name)) {
        alert("Name should contain atleast 3 letters");
        return;
      }
    }

    // Email validation
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    // Password minimum length
    if (password.length < 6) {
      alert("Password must contain at least 6 characters");
      return;
    }

    // Uppercase validation
    if (!/[A-Z]/.test(password)) {
      alert("Password must contain at least one uppercase letter");
      return;
    }

    // Lowercase validation
    if (!/[a-z]/.test(password)) {
      alert("Password must contain at least one lowercase letter");
      return;
    }

    // Number validation
    if (!/[0-9]/.test(password)) {
      alert("Password must contain at least one number");
      return;
    }

    // Special character validation
    if (!/[!@#$%^&*]/.test(password)) {
      alert("Password must contain at least one special character");
      return;
    }

    // FACULTY LOGIN
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

    // FACULTY CREATE ACCOUNT
    else {

      api.post("/faculty/signup", {
        name: name,
        email: email,
        password: password
      })

      .then((response) => {

        alert(response.data.message);

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

        <input
          type="email"
          placeholder="Enter Faculty Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        {!isLogin && (
          <p
            style={{
              fontSize: "13px",
              color: "#555",
              textAlign: "left",
              margin: "5px 0"
            }}
          >
            Password must contain at least 6 characters,
            one uppercase letter, one lowercase letter,
            one number and one special character.
          </p>
        )}

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">

          {isLogin
            ? "Faculty Login"
            : "Create Faculty Account"}

        </button>

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