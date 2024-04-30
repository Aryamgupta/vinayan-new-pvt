import React, { useEffect, useState } from "react";
import ocrIcon from "./Images/SliderPCr.png";
import speedIcon from "./Images/sliderSpeed.png";
import axios from "axios";

const Dashboard = ({loading, setLoading}) => {
  const [recordData, setRecordData] = useState([]);

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
    setLoading(false);
    // console.log(data.data);
  };

  useEffect(() => {
    fetchAllRecords();
  }, [])

  return (
    <div className="mainDashboard">
      <div className="mainScreen">
        <div>
          <div>
            <p>OCR</p>
            <p>LK23UK2345</p>
          </div>
          <div>
            <p>Speed</p>
            <p>50 KM/Hr</p>
          </div>
          <div>
            <p>Distance</p>
            <p>30 m</p>
          </div>
        </div>
        <img />
        <div></div>
      </div>
      <div className="sliderMain">
        {recordData.length !== 0 && recordData.map((data) => {
          return <div className="sliderCard">
            <img src={data.plot_image}/>
            <p>
              <img src={ocrIcon} />
              {data.ocr}
            </p>
            <p>
              <img src={speedIcon} />
              {data.speed} KM/Hr
            </p>
          </div>;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
