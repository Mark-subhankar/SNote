import React, { createContext, useState } from "react";

export const LoginContext = createContext("");

const Context = ({ children }) => {
    // this is use as globaly
    const [logindata, setloginData] = useState("");

    return ( <
        div >
        <
        LoginContext.Provider value = {
            { logindata, setloginData } } > { " " } { children } { " " } <
        /LoginContext.Provider>{" "} <
        /div>
    );
};

export default Context;