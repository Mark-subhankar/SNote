// Loading.js
import React from "react";
import "../component_css/mix.css";
import loading from "./loading.gif";

function Loading() {
    return ( <
        div className = "loading" >
        <
        img style = {
            { display: "block", margin: "auto" } }
        src = { loading }
        alt = "Loading" /
        >
        <
        /div>
    );
}

export default Loading;