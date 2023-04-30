import React from "react";
import "../styles/Input.css";

export default class Input extends React.Component {
  render() {
    const { type, id, placeholder, defaultValue } = this.props;
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
}
