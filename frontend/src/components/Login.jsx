import { useState } from "react";
import api from "../api";
import "./Login.css";

function Login({ setPage }) {

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailPattern =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const namePattern =
  /^[A-Za-z ]{3,}$/;

  const handleSubmit = (e) => {

    e.preventDefault();

    // NAME VALIDATION
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

    // EMAIL VALIDATION
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    // PASSWORD VALIDATION
    if (password.length < 6) {
      alert("Password must contain at least 6 characters");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      alert("Password must contain at least one uppercase letter");
      return;
    }

    if (!/[a-z]/.test(password)) {
      alert("Password must contain at least one lowercase letter");
      return;
    }

    if (!/[0-9]/.test(password)) {
      alert("Password must contain at least one number");
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      alert("Password must contain at least one special character");
      return;
    }

    // STUDENT LOGIN
    if (isLogin) {

      api.post("/login", {
        email: email,
        password: password
      })

      .then((response) => {

        alert(response.data.message);

        if (response.data.message === "Login successful") {

          localStorage.setItem(
            "studentEmail",
            response.data.student.email
          );

          localStorage.setItem(
            "studentName",
            response.data.student.name
          );

          setPage("dashboard");
        }

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

    // STUDENT CREATE ACCOUNT
    else {

      api.post("/signup", {
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
            ? "Student Login"
            : "Create Student Account"}
        </h3>

        {!isLogin && (

          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

        )}

        <input
          type="email"
          placeholder="Enter College Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {!isLogin && (

          <p
            style={{
              fontSize: "13px",
              color: "#555",
              textAlign: "left"
            }}
          >
            Password must contain at least 6 characters,
            one uppercase letter, one lowercase letter,
            one number and one special character.
          </p>

        )}

        <button type="submit">

          {isLogin
            ? "Login"
            : "Create Account"}

        </button>

        <p>

          {isLogin
            ? "Don't have an account? "
            : "Already have an account? "}

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

        {isLogin && (

          <button
            type="button"
            onClick={() =>
              setPage("facultyLogin")
            }
          >
            Faculty Login
          </button>

        )}

      </form>

    </div>

  );
}

export default Login;