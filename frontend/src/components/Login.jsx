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


  const handleSubmit = (e) => {

    e.preventDefault();


    // ==============================
    // NAME VALIDATION
    // ==============================

    if (!isLogin && name.trim() === "") {

      alert("Please Enter Your Name");

      return;

    }


    // ==============================
    // EMAIL VALIDATION
    // ==============================

    if (!emailPattern.test(email)) {

      alert("Please Enter Valid Email");

      return;

    }


    // ==============================
    // PASSWORD VALIDATION
    // ==============================

    if (password.trim() === "") {

      alert("Please Enter Password");

      return;

    }


    // ==============================
    // STUDENT LOGIN
    // ==============================

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


    // ==============================
    // CREATE STUDENT ACCOUNT
    // ==============================

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


        {/* NAME */}

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


        {/* EMAIL */}

        <input
          type="email"
          placeholder="Enter College Email"
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


        {/* LOGIN / CREATE ACCOUNT */}

        <button type="submit">

          {isLogin
            ? "Login"
            : "Create Account"}

        </button>


        {/* STUDENT LOGIN / SIGNUP */}

        <p>

          {isLogin
            ? "Don't have an account? "
            : "Already have an account? "}


          <span
            onClick={() =>
              setIsLogin(!isLogin)
            }
          >

            {isLogin
              ? "Create Account"
              : "Login"}

          </span>

        </p>


        {/* FACULTY LOGIN */}

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