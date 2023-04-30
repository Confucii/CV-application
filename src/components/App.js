import React from "react";
import "../styles/App.css";
import Header from "./Header";
import PersonalData from "./PersonalData";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <PersonalData />
      </div>
    );
  }
}
