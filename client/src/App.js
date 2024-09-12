import Header from "./components/Header";
import Login from "./components/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Profile from "./components/YourProfile";
import Error from "./components/Error";
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";
import Alert from "./components/Alert";

function App() {
  const { logindata, setloginData } = useContext(LoginContext);

  const [alert, setAlert] = useState(null);

  const navigate = useNavigate(); // Define navigate function

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };

  const DashboardValid = async () => {
    const host = "http://localhost:8000";
    // const host = "https://notecloud-server-svk4.onrender.com";

    let token = localStorage.getItem("usersdatatoken");

    if (token) {
      const res = await fetch(`${host}/validuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await res.json();

      if (data.status === 201) {
        // console.log("user verify");
        setloginData(data.validUserOne);
        navigate("/dash");
      } else {
        // console.log("user not valid");
      }
    }
  };

  useEffect(() => {
    DashboardValid(); // Only call this on mount
  }, []); // Empty dependency array means this effect runs only once, on mount

  return (
    <>
      <Header /> {alert && <Alert alert={alert}/>}
      <Routes>
        <Route exact path="/" element={<Login showAlert={showAlert} />} />
        <Route
          exact
          path="/register"
          element={<Register showAlert={showAlert} />}
        />{" "}
        <Route
          exact
          path="/dash"
          element={<Dashboard showAlert={showAlert} />}
        />{" "}
        <Route exact path="/profile" element={<Profile />} />{" "}
        <Route exact path="/error" element={<Error />} />{" "}
      </Routes>{" "}
    </>
  );
}

export default App;
