import axios from "axios";
import React, { useEffect, useState } from "react";

const LidarSetting = ({setLoading}) => {
  const [editable, setEditable] = useState(false);
  const [lidarSetting, setLidarSetting] = useState({});
  const [modee, setModee] = useState(0);

  const fetchLidarSetting = async function () {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-isense-token":
          "17ba650ba063931c56a9f83d8a8018831304549fcc98d2a7ffefb27196c46965",
      },
    };

    const { data } = await axios.get(
      "https://intuisense-mockserver.onrender.com/api/lidarconfig",
      config
    );
    setLidarSetting(data);
    if(data.mode == "manual"){
        setModee(1);
    }
    else{
        setModee(2);
    }

    setLoading(false);
  };

  const saveLidarSetting = async function(){
    setLoading(true);
    const config = {
        headers: {
          "Content-Type": "application/json",
          "x-isense-token":
            "17ba650ba063931c56a9f83d8a8018831304549fcc98d2a7ffefb27196c46965",
        },
      };

      const { data } = await axios.post(
        "https://intuisense-mockserver.onrender.com/api/lidarconfig",
        lidarSetting,
        config
      );
      setLidarSetting(data.data);
      console.log(data.data);
    if(data.mode === "manual"){
        setModee(1);
    }
    else{
        setModee(2);
    }
    setLoading(false);
  }

  

  const setMode = function(e,i){
    let newlidarSetting = {...lidarSetting,mode:e.target.value};
    setModee(i);
    setLidarSetting(newlidarSetting);
  }


  useEffect(() => {
    fetchLidarSetting();
  }, []);

  return (
    <div className="lidarMainDiv">
      <div>
        <label className="majorLabel">Link Mac Address</label>
        <input
          className="majorInpFeild"
          placeholder="Enter address"
          disabled={!editable}
          value={lidarSetting.lidar_url}
          onChange={(e)=>{
            let newLidarSetting = {...lidarSetting,lidar_url:e.target.value};
            setLidarSetting(newLidarSetting);
          }}
          
        />
      </div>
      <div className="mainModeDiv">
        <label className="majorLabel" style={{ margin: "0px 0px 50px 0px" }}>
          Mode
        </label>
        <div>
          <div className="radioInpField">
            <input
              type="radio"
              value="manual"
              name="mode"
              disabled={!editable}
              checked={modee === 1}
              onChange={(e)=>{
                setMode(e,1);
              }}
            />
            <label>Manual Trigger</label>
          </div>
          <div className="radioInpField">
            <input
              type="radio"
              value="auto"
              name="mode"
              disabled={!editable}
              checked={modee === 2}
              onChange={(e)=>{
                setMode(e,2);
              }}
            />
            <label>Auto Trigger</label>
          </div>
        </div>
      </div>
      <div className="editCont">
        <button
          onClick={(e) => {
            if (editable) {
              setEditable(false);
              saveLidarSetting();
            } else {
              setEditable(true);
            }
          }}
          className="majorEditBtn"
        >
          {editable ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default LidarSetting;
