import React, { useContext } from "react";
import "../component_css/header.css";
import { Link } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import { useNavigate } from "react-router-dom";

function Header() {
  const { logindata, setloginData } = useContext(LoginContext);
  const history = useNavigate();

  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  const logoutuser = async () => {
    const host = "http://localhost:8000";
    // const host = "https://notecloud-server-svk4.onrender.com";

    let token = localStorage.getItem("usersdatatoken");
    // console.log("recive token", token);

    if (!token) {
      console.error("Token is missing");
      return;
    }

    const res = await fetch(`${host}/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    // console.log(data);

    if (data.status === 201) {
      //   console.log("user logout");
      localStorage.removeItem("usersdatatoken");
      setloginData(false);
      history("/");
    } else {
      console.log("error");
    }
  };

  //   const goDash = () => {
  //     history("/dash");
  //   };

  const goError = () => {
    history("/error");
  };

  return (
    <>
      <header>
        <nav>
          <h1 style={{ fontSize: "1.4rem", fontFamily: "'Ultra', serif" }}>
            {" "}
            NoteCloud{" "}
          </h1>{" "}
          <div onClick={myFunction} className="dropbtn">
            <i className="fa-solid fa-circle-user" style={{ fontSize: "30px" }}>
              {" "}
            </i>{" "}
            <div id="myDropdown" className="dropdown-content">
              {" "}
              {logindata.validUserOne ? (
                <>
                  <Link to="/profile"> Profile </Link>{" "}
                  <Link to="/logout" onClick={logoutuser}>
                    {" "}
                    LogOut{" "}
                  </Link>{" "}
                </>
              ) : (
                <>
                  <Link to="/error" onClick={goError}>
                    {" "}
                    Profile{" "}
                  </Link>{" "}
                </>
              )}{" "}
            </div>{" "}
          </div>{" "}
        </nav>{" "}
      </header>{" "}
    </>
  );
}

export default Header;
