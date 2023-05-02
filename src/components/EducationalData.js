import React, { useState } from "react";
import "../styles/EducationalData.css";
import uniqid from "uniqid";
import Input from "./Input";
import format from "date-fns/format";

export default function EducationalData() {
  const [educationalInfo, setEducationalInfo] = useState([]);

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

    setEducationalInfo(
      educationalInfo.map((info) => {
        if (info.id === elemRef.dataset.id) {
          return {
            editable: info.editable,
            ongoing: e.target.checked,
            schoolTitle: info.schoolTitle,
            studyTitle: info.studyTitle,
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
    setEducationalInfo(
      educationalInfo.map((info) => {
        if (info.id === e.target.dataset.id) {
          return {
            editable: false,
            ongoing: info.ongoing,
            schoolTitle: e.target.querySelector("#school-title").value,
            studyTitle: e.target.querySelector("#study-title").value,
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
    setEducationalInfo(
      educationalInfo.filter(
        (info) => info.id !== e.target.parentElement.dataset.id
      )
    );
  }

  function editData(e) {
    setEducationalInfo(
      educationalInfo.map((info) => {
        if (info.id === e.target.parentElement.dataset.id) {
          return {
            editable: true,
            ongoing: info.ongoing,
            schoolTitle: info.schoolTitle,
            studyTitle: info.studyTitle,
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
    setEducationalInfo([
      ...educationalInfo,
      {
        editable: true,
        ongoing: false,
        schoolTitle: "",
        studyTitle: "",
        fromDate: "",
        toDate: "",
        id: uniqid(),
      },
    ]);
  }

  return (
    <div className="Educational-Data">
      <h1>Educational info</h1>
      {educationalInfo.map((eduInfo) => {
        if (eduInfo.editable) {
          return (
            <form
              data-id={eduInfo.id}
              key={eduInfo.id}
              className="Educational-Data-form"
              onSubmit={saveData}
            >
              <Input
                type="text"
                id="school-title"
                placeholder="School title"
                defaultValue={eduInfo.schoolTitle}
              />
              <Input
                type="text"
                id="study-title"
                placeholder="Program title"
                defaultValue={eduInfo.studyTitle}
              />
              <Input
                type="date"
                id="from-date"
                placeholder="From"
                defaultValue={eduInfo.fromDate}
              />
              <div className="ongoing">
                <div className={`Input to-date`}>
                  <label htmlFor="to-date">To:</label>
                  <input
                    type="date"
                    name="to-date"
                    id="to-date"
                    placeholder="To"
                    defaultValue={eduInfo.toDate}
                    disabled={eduInfo.ongoing}
                    required
                  />
                </div>
                Ongoing:
                <input
                  type="checkbox"
                  name="ongoing"
                  id="ongoing"
                  checked={eduInfo.ongoing}
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
              className="Educational-Data-txt"
              key={eduInfo.id}
              data-id={eduInfo.id}
            >
              <p className="school-title">
                School title: {eduInfo.schoolTitle}
              </p>
              <p className="study-title">Program title: {eduInfo.studyTitle}</p>
              <p>From: {format(new Date(eduInfo.fromDate), "MM/dd/yyyy")}</p>
              <p>
                To:{" "}
                {eduInfo.ongoing
                  ? "Ongoing"
                  : format(new Date(eduInfo.toDate), "MM/dd/yyyy")}
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
