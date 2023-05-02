import React from "react";
import "../styles/Input.css";

export default function Input(props) {
  const { type, id, placeholder, defaultValue } = props;
  return (
    <div className={`Input ${id}`}>
      <label htmlFor={id}>{placeholder}:</label>
      <input
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
}
