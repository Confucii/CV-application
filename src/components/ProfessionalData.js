import React, { useState } from "react";
import "../styles/ProfessionalData.css";
import uniqid from "uniqid";
import Input from "./Input";
import format from "date-fns/format";

export default function ProfessionalData() {
  const [professionalInfo, setProfessionalInfo] = useState([]);

  function checkValidity(e) {
    const formRef = e.target.parentElement;
    formRef.querySelector("#from-date").setCustomValidity("");
    if (!formRef.checkValidity()) {
      formRef.reportValidity();
      return;
    } else if (
      !formRef.querySelector("#to-date").disabled &&
      new Date(formRef.querySelector("#from-date").value).getTime() >
        new Date(formRef.querySelector("#to-date").value).getTime()
    ) {
      formRef
        .querySelector("#from-date")
        .setCustomValidity("'From' date should be before 'To' date");
      formRef.querySelector("#from-date").reportValidity();
      return;
    } else {
      formRef.dispatchEvent(new Event("submit", { bubbles: true }));
    }
  }

  function ongoingHandler(e) {
    const elemRef = e.target.parentElement.parentElement;

    setProfessionalInfo(
      professionalInfo.map((info) => {
        if (info.id === elemRef.dataset.id) {
          return {
            editable: info.editable,
            ongoing: e.target.checked,
            companyTitle: info.companyTitle,
            positionTitle: info.positionTitle,
            jobDescription: info.jobDescription,
            fromDate: info.fromDate,
            toDate: info.toDate,
            id: info.id,
          };
        }
        return info;
      })
    );
  }

  function saveData(e) {
    setProfessionalInfo(
      professionalInfo.map((info) => {
        if (info.id === e.target.dataset.id) {
          return {
            editable: false,
            ongoing: info.ongoing,
            companyTitle: e.target.querySelector("#company-title").value,
            positionTitle: e.target.querySelector("#position-title").value,
            jobDescription: e.target.querySelector("#job-description").value,
            fromDate: e.target.querySelector("#from-date").value,
            toDate: e.target.querySelector("#to-date").value,
            id: info.id,
          };
        }
        return info;
      })
    );
  }

  function deleteData(e) {
    setProfessionalInfo(
      professionalInfo.filter(
        (info) => info.id !== e.target.parentElement.dataset.id
      )
    );
  }

  function editData(e) {
    setProfessionalInfo(
      professionalInfo.map((info) => {
        if (info.id === e.target.parentElement.dataset.id) {
          return {
            editable: true,
            ongoing: info.ongoing,
            companyTitle: info.companyTitle,
            positionTitle: info.positionTitle,
            jobDescription: info.jobDescription,
            fromDate: info.fromDate,
            toDate: info.toDate,
            id: info.id,
          };
        }
        return info;
      })
    );
  }

  function addData() {
    setProfessionalInfo([
      ...professionalInfo,
      {
        editable: true,
        ongoing: false,
        companyTitle: "",
        positionTitle: "",
        jobDescription: "",
        fromDate: "",
        toDate: "",
        id: uniqid(),
      },
    ]);
  }

  return (
    <div className="Professional-Data">
      <h1>Professional info</h1>
      {professionalInfo.map((profInfo) => {
        if (profInfo.editable) {
          return (
            <form
              data-id={profInfo.id}
              key={profInfo.id}
              className="Professional-Data-form"
              onSubmit={saveData}
            >
              <Input
                type="text"
                id="company-title"
                placeholder="Company title"
                defaultValue={profInfo.companyTitle}
              />
              <Input
                type="text"
                id="position-title"
                placeholder="Position title"
                defaultValue={profInfo.positionTitle}
              />
              <div className="Input job-description">
                <label htmlFor="job-description">Job description:</label>
                <textarea
                  name="job-description"
                  id="job-description"
                  cols="30"
                  rows="3"
                  minLength="20"
                  defaultValue={profInfo.jobDescription}
                  required
                ></textarea>
              </div>
              <Input
                type="date"
                id="from-date"
                placeholder="From"
                defaultValue={profInfo.fromDate}
              />
              <div className="ongoing">
                <div className={`Input to-date`}>
                  <label htmlFor="to-date">To:</label>
                  <input
                    type="date"
                    name="to-date"
                    id="to-date"
                    placeholder="To"
                    defaultValue={profInfo.toDate}
                    disabled={profInfo.ongoing}
                    required
                  />
                </div>
                Ongoing:
                <input
                  type="checkbox"
                  name="ongoing"
                  id="ongoing"
                  checked={profInfo.ongoing}
                  onChange={ongoingHandler}
                />
              </div>
              <button onClick={checkValidity}>Save</button>
              <button type="button" onClick={deleteData}>
                Delete
              </button>
            </form>
          );
        } else {
          return (
            <div
              className="Professional-Data-txt"
              key={profInfo.id}
              data-id={profInfo.id}
            >
              <p className="company-title">
                Company title: {profInfo.companyTitle}
              </p>
              <p className="position-title">
                Position title: {profInfo.positionTitle}
              </p>
              <p className="position-title">
                Job description: {profInfo.jobDescription}
              </p>
              <p>From: {format(new Date(profInfo.fromDate), "MM/dd/yyyy")}</p>
              <p>
                To:{" "}
                {profInfo.ongoing
                  ? "Ongoing"
                  : format(new Date(profInfo.toDate), "MM/dd/yyyy")}
              </p>
              <button type="button" onClick={editData}>
                Edit
              </button>
              <button type="button" onClick={deleteData}>
                Delete
              </button>
            </div>
          );
        }
      })}
      <button type="button" onClick={addData}>
        Add
      </button>
    </div>
  );
}
