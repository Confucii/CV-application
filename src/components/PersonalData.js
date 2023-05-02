import React, { useState } from "react";
import Input from "./Input";
import "../styles/PersonalData.css";

export default function PersonalData() {
  const [state, setPersonalData] = useState({
    editable: true,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  function saveData(e) {
    e.preventDefault();
    setPersonalData({
      editable: false,
      firstName: document.querySelector("#first-name").value,
      lastName: document.querySelector("#last-name").value,
      email: document.querySelector("#email").value,
      phone: document.querySelector("#phone").value,
    });
  }

  function editData() {
    setPersonalData({
      editable: true,
      firstName: document.querySelector("#first-name").value,
      lastName: document.querySelector("#last-name").value,
      email: document.querySelector("#email").value,
      phone: document.querySelector("#phone").value,
    });
  }
  if (state.editable) {
    return (
      <form onSubmit={saveData} className="Personal-Data-form">
        <h1>General info</h1>
        <Input
          type="text"
          id="first-name"
          placeholder="First name"
          defaultValue={state.firstName}
        />
        <Input
          type="text"
          id="last-name"
          placeholder="Last name"
          defaultValue={state.lastName}
        />
        <Input
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={state.email}
        />
        <Input
          type="tel"
          id="phone"
          placeholder="Phone"
          defaultValue={state.phone}
        />
        <button>Save</button>
      </form>
    );
  } else {
    return (
      <div className="Personal-Data-txt">
        <h1>General info</h1>
        <p>First name: {state.firstName}</p>
        <p>Last name: {state.lastName}</p>
        <p>Email: {state.email}</p>
        <p>Phone: {state.phone}</p>
        <button type="button" onClick={editData}>
          Edit
        </button>
      </div>
    );
  }
}
