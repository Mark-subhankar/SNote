import React from "react";

function Alert(props) {
  const capitalize = (word) => {
    if (!word) {
      return ""; // Return an empty string if word is undefined or falsy
    }

    if (word === "danger") {
      word = "error";
    }

    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const alertClass = `alert alert-${props.alert.type}`;

  return (
    <div>
      <div className={alertClass} role="alert">
        <strong> {capitalize(props.alert.type)} </strong>: {props.alert.msg}{" "}
      </div>{" "}
    </div>
  );
}

export default Alert;
