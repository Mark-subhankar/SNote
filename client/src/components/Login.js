import React, { useState } from "react";
import "../component_css/mix.css";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./loading"; // Import the Loading component

function Login(props) {
  const [passShow, setPassShow] = useState(false);
  const host = "http://localhost:8000";
  //   const host = "https://notecloud-server-svk4.onrender.com";
  const [inpval, SetInpval] = useState({
    email: "",
    password: "",
  });
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // State to control loading spinner

  const setVal = (e) => {
    const { name, value } = e.target;
    SetInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const loginuser = async (e) => {
    e.preventDefault();
    const { email, password } = inpval;

    if (email === "") {
      props.showAlert("Email is required! ", "warning");
    } else if (!email.includes("@")) {
      props.showAlert(
        "Please include an '@' in the email address! ",
        "warning"
      );
    } else if (password === "") {
      props.showAlert("Password is required! ", "warning");
    } else if (password.length < 6) {
      props.showAlert("Password must be 6 characters!", "warning");
    } else {
      setIsLoading(true); // Show the loading spinner

      const data = await fetch(`${host}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const res = await data.json();

      if (res.status === 201) {
        localStorage.setItem("usersdatatoken", res.result.token);
        props.showAlert("Logged in successfully", "success");
        // Redirect to the next page after a delay (e.g., 2 seconds)

        history("/dash");
        SetInpval({ ...inpval, email: "", password: "" });
        setIsLoading(false); // Hide the loading spinner
      } else {
        props.showAlert("Invalid details", "danger");
        setIsLoading(false); // Hide the loading spinner on error
      }
    }
  };

  return (
    <>
      {" "}
      {isLoading && <Loading />}{" "}
      {/* Show loading spinner when isLoading is true */}{" "}
      <section>
        <div className="form_data">
          <div className="from_heading">
            <h1> Welcome Back, Log In </h1>{" "}
            <p> Hi, we are glad you are back.Please login. </p>{" "}
          </div>{" "}
          <form>
            <div className="form_input">
              <label htmlFor="email"> Email </label>{" "}
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
                onChange={setVal}
                value={inpval.email}
              />{" "}
            </div>{" "}


            <div className="form_input">
              <label htmlFor="password"> Password </label>{" "}
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="Enter Your password"
                  onChange={setVal}
                  value={inpval.password}
                />{" "}
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? (
                    <i className="fa-solid fa-eye-slash"> </i>
                  ) : (
                    <i className="fa-solid fa-eye"> </i>
                  )}
                </div>{" "}
              </div>{" "}
            </div>{" "}




            <button className="btn" onClick={loginuser}>
              Login{" "}
            </button>{" "}
            <p>
              Don 't have an Account? <Link to="/register">Sign Up</Link>{" "}
            </p>{" "}
          </form>{" "}
        </div>{" "}
      </section>{" "}
    </>
  );
}

export default Login;
