import React, { useEffect, useState } from "react";
import car from "./Icons/prime_car.png";
import mgv from "./Icons/iconoir_delivery-truck.png";
import bus from "./Icons/ion_bus-outline.png";
import truck from "./Icons/mynaui_truck.png";
import twowheeler from "./Icons/material-symbols_two-wheeler-outline-rounded.png";
import auto from "./Icons/fluent_vehicle-car-profile-ltr-24-regular.png";
import incIcon from "./Icons/inc.png";
import decIcon from "./Icons/dec.png";
import axios from "axios";

const SpeedSetting = ({setLoading}) => {
  const [editable, setEditable] = useState(false);
  const [carSpeed, setCarSpeed] = useState(0);
  const [twowheelerSpeed, setTwowheelerSpeed] = useState(0);
  const [autoSpeed, setAutoSpeed] = useState(0);
  const [truckSpeed, setTruckSpeed] = useState(0);
  const [busSpeed, setBusSpeed] = useState(0);
  const [mgvSpeed, setMgvSpeed] = useState(0);

  const allSpeeds = {
    "car":[carSpeed, setCarSpeed],
    "twowheeler":[twowheelerSpeed, setTwowheelerSpeed] ,
    "auto":[autoSpeed, setAutoSpeed],
    "truck":[truckSpeed, setTruckSpeed],
    "bus":[busSpeed, setBusSpeed],
    "mgv":[mgvSpeed, setMgvSpeed]
  }

  const fetchAllSpeed = async function(){
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-isense-token":
          "17ba650ba063931c56a9f83d8a8018831304549fcc98d2a7ffefb27196c46965",
      },
    }

    for(let key in allSpeeds){
      const {data} = await axios.get(
        `https://intuisense-mockserver.onrender.com/api/speed/${key}`,
        config
      );
      allSpeeds[key][1](data.speed);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchAllSpeed();
  }, [])

  const setAllSpeed = async function () {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-isense-token":
          "17ba650ba063931c56a9f83d8a8018831304549fcc98d2a7ffefb27196c46965",
      },
    }

    for(let key in allSpeeds){
      let body = {
        "speed":allSpeeds[key][0]
      }
      const {data} = await axios.post(
        `https://intuisense-mockserver.onrender.com/api/speed/${key}`,
        body,
        config
      );
      allSpeeds[key][1](data.speed);
    }
    setLoading(false);
  };

  const incInp = function (e, name) {
    const targetInp = document.querySelector(`input[name=${name}]`);

    let val = Number(targetInp.value);
    if (val == 200) return;
    targetInp.value = val + 5;
    setVehSpeed(name, targetInp.value);
  };

  const decInp = function (e, name) {
    const targetInp = document.querySelector(`input[name=${name}]`);
    let val = Number(targetInp.value);
    if (val == 0) return;
    targetInp.value = val - 5;
    setVehSpeed(name,targetInp.value)
  };

  const setVehSpeed = function (name, speed) {
    speed = Number(speed);
    switch (name) {
      case "car": {
        setCarSpeed(speed);
        break;
      }
      case "twowheeler": {
        setTwowheelerSpeed(speed);
        break;
      }
      case "auto": {
        setAutoSpeed(speed);
        break;
      }
      case "truck": {
        setTruckSpeed(speed);
        break;
      }
      case "bus": {
        setBusSpeed(speed);
        break;
      }
      case "mgv": {
        setMgvSpeed(speed);
        break;
      }
    }
  };

  return (
    <div className="speedSettingMainDiv">
      <div>
        <div className="speedInpFieldCont">
          <label className="majorLabel">
            <img src={car} />
            Car
          </label>
          <input
            className="majorInpFeild"
            placeholder="0"
            disabled={!editable}
            type="number"
            max={200}
            min={0}
            name="car"
            value={carSpeed}
            onChange={(e) => {
              setCarSpeed(e.target.value);
            }}
          />
          <div className={editable ? "incDecBtns" : "none"}>
            <button
              onClick={(e) => {
                incInp(e, "car");
              }}
            >
              <img src={decIcon} />
            </button>
            <button
              onClick={(e) => {
                decInp(e, "car");
              }}
            >
              <img src={incIcon} />
            </button>
          </div>
        </div>
        <div className="speedInpFieldCont">
          <label className="majorLabel">
            <img src={twowheeler} />
            Two Wheeler
          </label>
          <input
            className="majorInpFeild"
            placeholder="0"
            disabled={!editable}
            type="number"
            max={200}
            min={0}
            name="twowheeler"
            value={twowheelerSpeed}
            onChange={(e) => {
              setTwowheelerSpeed(e.target.value);
            }}
          />
          <div className={editable ? "incDecBtns" : "none"}>
            <button
              onClick={(e) => {
                incInp(e, "twowheeler");
              }}
            >
              <img src={decIcon} />
            </button>
            <button
              onClick={(e) => {
                decInp(e, "twowheeler");
              }}
            >
              <img src={incIcon} />
            </button>
          </div>
        </div>
        <div className="speedInpFieldCont">
          <label className="majorLabel">
            <img src={auto} />
            Auto
          </label>
          <input
            className="majorInpFeild"
            placeholder="0"
            disabled={!editable}
            type="number"
            max={200}
            min={0}
            name="auto"
            value={autoSpeed}
            onChange={(e) => {
              setAutoSpeed(e.target.value);
            }}
          />
          <div className={editable ? "incDecBtns" : "none"}>
            <button
              onClick={(e) => {
                incInp(e, "auto");
              }}
            >
              <img src={decIcon} />
            </button>
            <button
              onClick={(e) => {
                decInp(e, "auto");
              }}
            >
              <img src={incIcon} />
            </button>
          </div>
        </div>
        <div className="speedInpFieldCont">
          <label className="majorLabel">
            <img src={truck} />
            Truck
          </label>
          <input
            className="majorInpFeild"
            placeholder="0"
            disabled={!editable}
            type="number"
            max={200}
            min={0}
            name="truck"
            value={truckSpeed}
            onChange={(e) => {
              setTruckSpeed(e.target.value);
            }}
          />
          <div className={editable ? "incDecBtns" : "none"}>
            <button
              onClick={(e) => {
                incInp(e, "truck");
              }}
            >
              <img src={decIcon} />
            </button>
            <button
              onClick={(e) => {
                decInp(e, "truck");
              }}
            >
              <img src={incIcon} />
            </button>
          </div>
        </div>
        <div className="speedInpFieldCont">
          <label className="majorLabel">
            <img src={bus} />
            Bus
          </label>
          <input
            className="majorInpFeild"
            placeholder="0"
            disabled={!editable}
            type="number"
            max={200}
            min={0}
            name="bus"
            value={busSpeed}
            onChange={(e) => {
              setBusSpeed(e.target.value);
            }}
          />
          <div className={editable ? "incDecBtns" : "none"}>
            <button
              onClick={(e) => {
                incInp(e, "bus");
              }}
            >
              <img src={decIcon} />
            </button>
            <button
              onClick={(e) => {
                decInp(e, "bus");
              }}
            >
              <img src={incIcon} />
            </button>
          </div>
        </div>
        <div className="speedInpFieldCont">
          <label className="majorLabel">
            <img src={mgv} />
            MGV
          </label>
          <input
            className="majorInpFeild"
            placeholder="0"
            disabled={!editable}
            type="number"
            max={200}
            min={0}
            name="mgv"
            value={mgvSpeed}
            onChange={(e) => {
              setMgvSpeed(e.target.value);
            }}
          />
          <div className={editable ? "incDecBtns" : "none"}>
            <button
              onClick={(e) => {
                incInp(e, "mgv");
              }}
            >
              <img src={decIcon} />
            </button>
            <button
              onClick={(e) => {
                decInp(e, "mgv");
              }}
            >
              <img src={incIcon} />
            </button>
          </div>
        </div>
      </div>
      <div className="editCont">
        <button
          onClick={(e) => {
            if (editable) {
              setEditable(false);
              setAllSpeed();
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

export default SpeedSetting;
