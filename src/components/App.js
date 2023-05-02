import React from "react";
import "../styles/App.css";
import Header from "./Header";
import PersonalData from "./PersonalData";
import EducationalData from "./EducationalData";
import ProfessionalData from "./ProfessionalData";

export default function App() {
  return (
    <div className="App">
      <Header />
      <PersonalData />
      <EducationalData />
      <ProfessionalData />
    </div>
  );
}
