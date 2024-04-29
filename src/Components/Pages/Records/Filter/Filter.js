import React, { useState } from "react";
import calender from "./Icons/calender.png";
import directionn from "./Icons/direction.png";
import ocrIcon from "./Icons/ocrFilter.png";
import speed from "./Icons/speed.png";
import vehCat from "./Icons/vehCat.png";
import vehTypee from "./Icons/vehType.png";

import incIcon from "./Icons/inc.png";
import decIcon from "./Icons/dec.png";

export const Filter = ({ setIsfilter, vehCategoryObj }) => {
  const [vehCategory, setVehCategory] = useState(0);
  const [vehType, setVehType] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(new Date());
  const [direction, setDirection] = useState(0);
  const [ocr, setOcr] = useState();
  const [minSpeed, setMinSpeed] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(200);

  window.addEventListener("click", function (e) {
    if (e.target.classList.contains("filterMainDiv")) {
      setIsfilter(false);
    }
  });


  const incSpeed = function (e,name){
    const targetInp = document.querySelector(`input[name=${name}]`);
    let val = Number(targetInp.value);
    if (val == 200) return;
    targetInp.value = val + 5;
    if(name == "minSpeeddd"){
      setMinSpeed(targetInp.value);
    }
    else{
      setMaxSpeed(targetInp.value)
    }
  }

  const decSpeed = function (e,name){
    const targetInp = document.querySelector(`input[name=${name}]`);
    let val = Number(targetInp.value);
    if (val == 0) return;
    targetInp.value = val - 5;
    if(name == "minSpeeddd"){
      setMinSpeed(targetInp.value);
    }
    else{
      setMaxSpeed(targetInp.value)
    }
  }

  const applyFilter = function(){
    console.log(vehCategory);
    console.log(vehType);
    console.log(ocr);
    console.log(ocr);
    console.log(minSpeed);
    console.log(maxSpeed);
    console.log(startDate);
    console.log(endDate);
    console.log(direction);
    setIsfilter(false);
  }

  return (
    <div className="filterMainDiv">
      <div className="filterMains">
        <div className="vehMidFilterDiv">
          <label>
            <img src={ocrIcon} /> OCR
          </label>
          <input
            className="majorInpFeild"
            placeholder="Enter OCR"
            value={ocr}
            onChange={(e) => {
              setOcr(e.target.value);
            }}
          />
        </div>
        <div className="vehMidFilterDiv">
          <label>
            <img src={directionn} /> Direction
          </label>
          <select
            value={direction}
            onChange={(e) => {
              setDirection(e.target.value);
            }}
          >
            <option>Select Direction</option>
            <option value="Approaching">Approaching</option>
            <option>Select Direction</option>
          </select>
        </div>
        <div className="vehMidFilterDiv">
          <label>
            <img src={vehCat} /> Vehicle Category
          </label>
          <select
            value={vehCategory}
            onChange={(e) => {
              setVehCategory(e.target.value);
            }}
          >
            <option>Select Category</option>
            {Object.keys(vehCategoryObj).map((item) => {
              return <option value={item}>{vehCategoryObj[item]}</option>;
            })}
          </select>
        </div>
        <div className="vehMidFilterDiv">
          <label>
            <img src={speed} /> Speed
          </label>
          <div className="speedInptt">
            <div>
              <input
                className="majorInpFeild"
                placeholder="0"
                type="number"
                max={maxSpeed}
                min={minSpeed}
                value={minSpeed}
                name="minSpeeddd"
                onChange={(e) => {
                  setMinSpeed(e.target.value);
                }}
              />
              <div className="incDecBtns">
                <button
                  onClick={(e) => {
                    incSpeed(e,"minSpeeddd")
                  }}
                >
                  <img src={decIcon} />
                </button>
                <button
                  onClick={(e) => {
                    decSpeed(e,"minSpeeddd")
                  }}
                >
                  <img src={incIcon} />
                </button>
              </div>
            </div>
            <p>To</p>
            <div>
              <input
                className="majorInpFeild"
                placeholder="0"
                type="number"
                max={maxSpeed}
                min={minSpeed}
                value={maxSpeed}
                name="maxSpeeddd"
                onChange={(e) => {
                  setMaxSpeed(e.target.value);
                }}
              />
              <div className="incDecBtns">
                <button
                  onClick={(e) => {
                    incSpeed(e,"maxSpeeddd")
                  }}
                >
                  <img src={decIcon} />
                </button>
                <button
                  onClick={(e) => {
                    decSpeed(e,"maxSpeeddd")
                  }}
                >
                  <img src={incIcon} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="vehFullFilterDiv">
          <label>
            <img src={calender} /> Created Date
          </label>
          <div>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
            <p>To</p>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="vehMidFilterDiv">
          <label>
            <img src={vehTypee} /> Vehicle Type
          </label>
          <select
            value={vehType}
            onChange={(e) => {
              setVehType(e.target.value);
            }}
          >
            <option style={{ height: "400px" }}>Select Direction</option>
            <option value="Private">Private</option>
            <option value="Commercial">Commercial</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
        <div className="vehMidFilterDiv">
          <button onClick={(e)=>{
            applyFilter()
          }}>View Result</button>
        </div>
      </div>
    </div>
  );
};
