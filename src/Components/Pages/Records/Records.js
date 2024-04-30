import React, { useEffect, useState } from "react";
import { Table } from "./Table/Table";
import { Grid } from "./Grid/Grid";
import exportIcon from "./Icons/exportIcon.png";
import fillterIcon from "./Icons/fillterIcon.png";
import refreshIcon from "./Icons/refreshIcon.png";
import gridV from "./Icons/gridV.png";
import listV from "./Icons/listV.png";
import page1 from "./Icons/pagination1.png";
import page2 from "./Icons/pagination2.png";
import axios from "axios";
import { GifOverlay } from "./GifOverlay";
import { SingleShow } from "../SingelDataShow/SingleShow";
import { Filter } from "./Filter/Filter";

const Records = ({setLoading}) => {
  const [gridView, setGridView] = useState(false);
  const [isfilter, setIsfilter] = useState(false);
  const [recordData, setRecordData] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [singleView, setSingleView] = useState(null);

  const exportFunc = function (e) {
    console.log(e);
  };

  const prevBtn = async function () {
    if (pagination == 1) return;
    setPagination(pagination - 1);
  };

  const nextBtn = async function () {
    if (pagination == 500) return;

    setPagination(pagination + 1);
  };

  const setTimeString = function (datee) {
    datee = new Date(datee);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthAbbreviation = months[datee.getMonth()];

    // Get the day, year, and hours
    const day = datee.getDate();
    const year = datee.getFullYear();
    let hours = datee.getHours();
    const minutes = datee.getMinutes();

    // Convert hours to 12-hour format and determine AM/PM
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    // Format the time with leading zero for minutes if needed
    const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;

    // Create the final formatted date string
    const formattedDate = `${monthAbbreviation} ${day}, ${year} | ${formattedTime} ${amPm}`;

    return formattedDate;
  };

  const vehCategoryObj = {
    car: "Car",
    truck: "Truck",
    bus: "Bus",
    mgv: "MGV",
    twowheeler: "Two Wheeler",
    auto: "Auto",
  };

  const fetchAllRecords = async function () {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-isense-token":
          "17ba650ba063931c56a9f83d8a8018831304549fcc98d2a7ffefb27196c46965",
      },
    };

    const { data } = await axios.get(
      "https://intuisense-mockserver.onrender.com/api/records",
      config
    );
    setRecordData(data.data);
    // console.log(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllRecords();
  }, []);

  return (
    <>
      {!singleView ? (
        <div className="recordsMainDiv">
          <div className="recordNav">
            <div className="recordNavLeftPart">
              <div
                onClick={(e) => {
                  setGridView(!gridView);
                }}
                style={{
                  transition: "all 0.5s ease",
                }}
              >
                {gridView ? <img src={listV} /> : <img src={gridV} />}
              </div>
              <button
                onClick={(e) => {
                  console.log(isfilter);
                  setIsfilter(true);
                }}
              >
                Filters
                <img src={fillterIcon} />
              </button>
              <button
                onClick={(e) => {
                  exportFunc(e);
                }}
              >
                Export
                <img src={exportIcon} />
              </button>
            </div>
            <div className="recordNavRightPart">
              <div className="paginationDiv">
                <button
                  onClick={(e) => {
                    prevBtn();
                  }}
                >
                  <img src={page1} />
                </button>
                <p className="selectedp">{pagination}</p>
                <p>/</p>
                <p>1000</p>
                <button
                  onClick={(e) => {
                    nextBtn();
                  }}
                >
                  <img src={page2} />
                </button>
              </div>
              <button>
                {" "}
                <img src={refreshIcon} /> Refresh
              </button>
            </div>
          </div>
          {!gridView ? (
            <Table
              data={recordData}
              setTimeString={setTimeString}
              vehCategoryObj={vehCategoryObj}
              setSingleView={setSingleView}
            />
          ) : (
            <Grid
              data={recordData}
              setTimeString={setTimeString}
              vehCategoryObj={vehCategoryObj}
              setSingleView={setSingleView}
            />
          )}
        </div>
      ) : (
        <SingleShow
          id={singleView}
          setSingleView={setSingleView}
          setTimeString={setTimeString}
          vehCategoryObj={vehCategoryObj}
          setLoading={setLoading}
        />
      )}
      {isfilter && (
        <Filter setIsfilter={setIsfilter} vehCategoryObj={vehCategoryObj}   setLoading={setLoading}/>
      )}
    </>
  );
};

export default Records;
