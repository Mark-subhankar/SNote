import React, { useContext } from "react";
import "../component_css/Profile.css";
import { LoginContext } from "./ContextProvider/Context";

function YourProfile() {
    const { logindata, setloginData } = useContext(LoginContext);

    return ( <
        >
        <
        div className = "container" >
        <
        div className = "card" >
        <
        i className = "fa-solid fa-user"
        id = "Picon" > { " " } <
        /i>{" "} <
        h1 style = {
            { marginTop: "30px" } } > { " " } { logindata.validUserOne.fname.trim() } { " " } <
        /h1>{" "} <
        p > { logindata.validUserOne.email.trim() } < /p>{" "} <
        /div>{" "} <
        /div>{" "} <
        />
    );
}

export default YourProfile;