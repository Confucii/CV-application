import React from "react";
import Input from "./Input";
import "../styles/PersonalData.css";

export default class PersonalData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: true,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
    this.saveData = this.saveData.bind(this);
    this.editData = this.editData.bind(this);
  }

  saveData(e) {
    e.preventDefault();
    this.setState(() => {
      return {
        editable: false,
        firstName: document.querySelector("#first-name").value,
        lastName: document.querySelector("#last-name").value,
        email: document.querySelector("#email").value,
        phone: document.querySelector("#phone").value,
      };
    });
  }

  editData() {
    this.setState({
      editable: true,
    });
  }

  render() {
    if (this.state.editable) {
      return (
        <form onSubmit={this.saveData} className="Personal-Data-form">
          <h1>General info</h1>
          <Input
            type="text"
            id="first-name"
            placeholder="First name"
            defaultValue={this.state.firstName}
          />
          <Input
            type="text"
            id="last-name"
            placeholder="Last name"
            defaultValue={this.state.lastName}
          />
          <Input
            type="email"
            id="email"
            placeholder="Email"
            defaultValue={this.state.email}
          />
          <Input
            type="tel"
            id="phone"
            placeholder="Phone"
            defaultValue={this.state.phone}
          />
          <button>Save</button>
        </form>
      );
    } else {
      return (
        <div className="Personal-Data-txt">
          <h1>General info</h1>
          <p>First name: {this.state.firstName}</p>
          <p>Last name: {this.state.lastName}</p>
          <p>Email: {this.state.email}</p>
          <p>Phone: {this.state.phone}</p>
          <button type="button" onClick={this.editData}>
            Edit
          </button>
        </div>
      );
    }
  }
}
