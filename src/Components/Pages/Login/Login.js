import React, { useState } from "react";
import logoImg from "../../../Images/vinayanlogo 1.png";
import PinInput from "react-pin-input";
import policeLogo from "./Icons/policeSolgon.png";
import goBackSol from "./Icons/ph_arrow-up-bold.png";
import enterGoBack from "./Icons/ph_arrow-up-bold (1).png";
import backspace from "./Icons/Backspace.png";
import ReactCodeInput from "react-code-input";
import { StatefulPinInput } from "react-input-pin-code";
import { useNavigate } from "react-router-dom";

const Login = ({setIsNavBar ,loading, setLoading}) => {
  const [isDialPadOpen, setIsDialPadOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);
  const [loginPin, setLoginPin] = useState("");
  const navigate = useNavigate();

  const keyFunc = function (e) {
    if(loginPin.length == 4) return;
    let newStr = loginPin.concat(e.target.innerText);
    setLoginPin(newStr);
  };
  
  const backSpaceFunc = function(e){
    let newStr = loginPin.substring(0,loginPin.length-1);
    setLoginPin(newStr);
  }

  const login = function () {
    console.log(selectedUser, loginPin);
    setIsNavBar(true);
    navigate("/dashboard");
  }; // setP();

  return (
    <div className="loginMainBox">
      <div className="loginMainInfo">
        <img src={logoImg} />
        <div className="loginDetails">
          <h3>
            Log In <span>As</span>
          </h3>
          <h5>Welcome Back! Log in to continue</h5>
          <div>
            <label className="userName">Username</label>
            <select
              value={selectedUser}
              onChange={(e) => {
                setSelectedUser(e.target.value);
              }}
              id="selectUser"
            >
              <option value={0}>Select username</option>
              <option value={1}>Admin</option>
            </select>
          </div>
          <div
           
          >
            <label className="userName">Pin</label>
            
           
            <input value={loginPin}
             type="password"
             onClick={(e) => {
              setIsDialPadOpen(true);
            }}
            //  style={{borderBottom:"1px solid rgba(42, 82, 152, 0.3)",width:"100%",height:"50px"}}
             placeholder="Enter Pin"
              onChange={(e)=>{
              if(e.target.value.length <= 4)
              setLoginPin(e.target.value);
            }}/>
          </div>
          <div>
            <button
              onClick={(e) => {
                login();
              }}
              style={{ cursor: "pointer" }}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
      {isDialPadOpen ? (
        <div className="dailPadMain">
          <div className="dailPad">
            <button onClick={() => setIsDialPadOpen(false)}>
              <img src={goBackSol} />
            </button>
            <div>
              <div
                className="dialBtn"
                onClick={(e) => {
                  keyFunc(e);
                  console.log(e);
                }}
              >
                1
              </div>
              <div
                className="dialBtn"
                onClick={(e) => {
                  keyFunc(e);
                }}
              >
                2
              </div>
              <div
                className="dialBtn"
                onClick={(e) => {
                  keyFunc(e);
                }}
              >
                3
              </div>
              <div
                className="dialBtn"
                onClick={(e) => {
                  keyFunc(e);
                }}
              >
                4
              </div>
              <div
                className="dialBtn"
                onClick={(e) => {
                  keyFunc(e);
                }}
              >
                5
              </div>
              <div
                className="dialBtn"
                onClick={(e) => {
                  keyFunc(e);
                }}
              >
                6
              </div>
              <div
                className="dialBtn"
                onClick={(e) => {
                  keyFunc(e);
                }}
              >
                7
              </div>
              <div
                className="dialBtn"
                onClick={(e) => {
                  keyFunc(e);
                }}
              >
                8
              </div>
              <div
                className="dialBtn"
                onClick={(e) => {
                  keyFunc(e);
                }}
              >
                9
              </div>
              <div
                className="dialBtn"
                onClick={(e) => {
                  keyFunc(e);
                }}
              >
                *
              </div>
              <div
                className="dialBtn"
                onClick={(e) => {
                  keyFunc(e);
                }}
              >
                0
              </div>
              <div
                className="dialBtn"
                onClick={(e) => {
                  keyFunc(e);
                }}
              >
                #
              </div>
              <div className="backspaceDiv">
                <div
                  className="entertBtnDial"
                  onClick={(e) => {
                    login();
                  }}
                >
                  <img src={enterGoBack} />
                </div>
                <div className="backspaceBtn" onClick={(e)=>{backSpaceFunc(e)}}>
                  <img src={backspace} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="noDialPadScreen">
          <img src={policeLogo} />
          <p>The Next-Gen Traffic Management System by Vinayan</p>
        </div>
      )}
    </div>
  );
};

export default Login;
