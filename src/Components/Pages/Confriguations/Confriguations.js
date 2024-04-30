import React, { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import CameraSetting from "./CameraSetting";
import LidarSetting from "./LidarSetting";
import SpeedSetting from "./SpeedSetting";

const Confriguations = ({setLoading}) => {
  const [settingTab, setSettingTab] = useState("Camera");

  const settingTabFunc = function (e) {
    setSettingTab(e.target.innerText);
    const allBtns = e.target.parentElement.childNodes;
    allBtns.forEach((e)=>{
      e.classList.remove("confrigutaionActiveBtn");
    })
    e.target.classList.add("confrigutaionActiveBtn");
  };

  
  return (
    <div className="mainConfriguraution">
      <div className="sideTabs">
        <div
          onClick={(e) => settingTabFunc(e)}
          className="confrigutaionActiveBtn"
        >
          Camera
        </div>
        <div
          onClick={(e) => settingTabFunc(e)}
        >
          Lidar
        </div>
        <div
          onClick={(e) => settingTabFunc(e)}
        >
          Speed
        </div>
      </div>
      <div className="mainContentOfTabs">
        {settingTab === "Camera" && <CameraSetting setLoading={setLoading}/>}
        {settingTab === "Lidar" && <LidarSetting setLoading={setLoading}/>}
        {settingTab === "Speed" && <SpeedSetting setLoading={setLoading}/>}
      </div>
    </div>
  );
};

export default Confriguations;
