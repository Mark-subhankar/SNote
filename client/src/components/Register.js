import React, { useState } from "react";
import "../component_css/mix.css";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./loading"; // Import the Loading component

function Register(props) {
    //Reason -  password Hide : Show for use usestate
    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);

    const host = "http://localhost:8000";
    //   const host = "https://notecloud-server-svk4.onrender.com";

    const [inpval, SetInpval] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: "",
    });

    const history = useNavigate();

    const [isLoading, setIsLoading] = useState(false); // State to control loading spinner

    const setVal = (e) => {
        // get data from body
        // console.log(e.target.value);
        const { name, value } = e.target;

        // add data in input field
        SetInpval(() => {
            return {
                ...inpval,
                [name]: value,
            };
        });
    };

    const addUserdata = async(e) => {
        e.preventDefault();
        const { fname, email, password, cpassword } = inpval;

        //validation check
        if (fname === "") {
            //   alert("please enter your value ");
            props.showAlert("Please enter your name ", "warning");
        } else if (email === "") {
            props.showAlert("Email is required! ", "warning");
        } else if (!email.includes("@")) {
            props.showAlert(
                " Please includes an '@' in the email address! ",
                "warning"
            );
        } else if (password === "") {
            props.showAlert("Password is required! ", "warning");
        } else if (password.length < 6) {
            props.showAlert("Password must be 6 character!", "warning");
        } else if (cpassword === "") {
            props.showAlert("Confirm Password is required! ", "warning");
        } else if (cpassword.length < 6) {
            props.showAlert("Confirm Password must be 6 char!", "warning");
        } else if (password !== cpassword) {
            props.showAlert(
                "Password & Confirm Password are not matching! ",
                "warning"
            );
        } else {
            setIsLoading(true);
            // Sign Up api use
            const data = await fetch(`${host}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fname,
                    email,
                    password,
                    cpassword,
                }),
            });

            //   const res = await data.json();
            //   console.log(res);

            if (!data.ok) {
                const errorResponse = await data.json();
                console.error("Error response:", errorResponse);
            } else {
                const res = await data.json();
                // ... (rest of the code)

                if (res.status === 201) {
                    props.showAlert("Account created successfully ", "success");

                    history("/");
                    SetInpval({
                        ...inpval,
                        fname: "",
                        email: "",
                        password: "",
                        cpassword: "",
                    });
                    setIsLoading(false); // Hide the loading spinner
                } else {
                    props.showAlert(
                        "Oops! Something went wrong while creating the account.",
                        "danger"
                    );
                    setIsLoading(false);
                }
            }
        }
    };

    return ( <
        > { " " } { isLoading && < Loading / > } { " " } <
        section >
        <
        div className = "form_data" >
        <
        div className = "from_heading" >
        <
        h1 style = {
            { textAlign: "center" } } > Sign Up < /h1>{" "} <
        p style = {
            { textAlign: "center" } } >
        We we 're glad you came to sign up . Please sign up{" "} <
        /p>{" "} <
        /div>{" "} <
        form >
        <
        div className = "form_input" >
        <
        label htmlFor = "fname" > Name < /label>{" "} <
        input type = "text"
        name = "fname"
        id = "fname"
        placeholder = "Enter Your Name"
        onChange = { setVal }
        value = { inpval.fname }
        />{" "} <
        /div>{" "} <
        div className = "form_input" >
        <
        label htmlFor = "email" > Email < /label>{" "} <
        input type = "email"
        name = "email"
        id = "email"
        placeholder = "Enter Your Email Address"
        onChange = { setVal }
        value = { inpval.email }
        />{" "} <
        /div>{" "} <
        div className = "form_input" >
        <
        label htmlFor = "password" > Password < /label>{" "} <
        div className = "two" >
        <
        input type = {!passShow ? "password" : "text" }
        name = "password"
        id = "password"
        placeholder = "Enter Your password"
        onChange = { setVal }
        value = { inpval.password }
        />{" "} <
        div className = "showpass"
        onClick = {
            () => setPassShow(!passShow) } >
        { " " } {
            !passShow ? ( <
                i className = "fa-solid fa-eye-slash" > < /i>
            ) : ( <
                i className = "fa-solid fa-eye" > < /i>
            )
        } { " " } <
        /div>{" "} <
        /div>{" "} <
        /div>{" "} <
        div className = "form_input" >
        <
        label htmlFor = "cpassword" > Confirm Password < /label>{" "} <
        div className = "two" >
        <
        input type = {!cpassShow ? "password" : "text" }
        name = "cpassword"
        id = "cpassword"
        placeholder = "Enter Your password"
        onChange = { setVal }
        value = { inpval.cpassword }
        />{" "} <
        div className = "showpass"
        onClick = {
            () => setCPassShow(!cpassShow) } >
        { " " } {
            !cpassShow ? ( <
                i className = "fa-solid fa-eye-slash" > < /i>
            ) : ( <
                i className = "fa-solid fa-eye" > < /i>
            )
        } { " " } <
        /div>{" "} <
        /div>{" "} <
        /div>{" "} <
        button className = "btn"
        onClick = { addUserdata } > { " " }
        Sign Up { " " } <
        /button>{" "} <
        p >
        Already have an account ? < Link to = "/" > Login In < /Link>{" "} <
        /p>{" "} <
        /form>{" "} <
        /div>{" "} <
        /section>{" "} <
        />
    );
}

export default Register;