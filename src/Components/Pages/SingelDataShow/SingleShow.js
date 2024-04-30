import React, { useEffect, useState } from "react";
import goBackNormal from "./Icons/goBackNormal.png";
import backIcon from "./Icons/goBack.png";
import lati from "./Icons/lati.png";
import longi from "./Icons/longi.png";
import directIcon from "./Icons/direction.png";
import ocrIcon from "./Icons/ocr.png";
import speedIcon from "./Icons/speed.png";
import timeStampIcon from "./Icons/timeStamp.png";
import vehTypee from "./Icons/vehCat.png";
import vehCat from "./Icons/vehType.png";
import voilationIcon from "./Icons/violaion.png";
import cross from "./Icons/cross.png";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { InfoModal } from "./InfoModal";
import axios from "axios";
export const SingleShow = ({
  setSingleView,
  id,
  setTimeString,
  vehCategoryObj,
  setLoading
}) => {
  const [data, setData] = useState(null);
  const vehTypeArr = ["Private", "Commercial", "Electric"];
  const [infoModal, setInfoModal] = useState(null);
  const [editable, setEditable] = useState(false);
  const [newOcr, setNewOcr] = useState(null);
  const [vehCategory, setVehCategory] = useState(null);
  const [vehType, setVehType] = useState(null);
  const [selectedVioArr, setSelectedVioArr] = useState(null);
  const [booleanValue, setBooleanValue] = useState(false);
  const [ableToEdit, setAbleToEdit] = useState(true);
  const [sendServer, setSendServer] = useState(true);
  const [plotImage, setPlotImage] = useState(null);
  const [plateImg, setPlateImg] = useState(null);
  const [violationTypeArr, setViolationTypeArr] = useState([
    "Overspeeding",
    "No Helmet",
    "Triple Riding",
  ]);

  const printIframe = async function (id) {
    const iframe = document.frames
      ? document.frames[id]
      : document.getElementById(id);
    const iframeWindow = iframe.contentWindow || iframe;

    iframe.focus();
    iframeWindow.print();

    return false;
  };

  const printChallan = async function () {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-isense-token":
          "17ba650ba063931c56a9f83d8a8018831304549fcc98d2a7ffefb27196c46965",
      },
    };

    const body = {
      isPrinted: true,
    };

    const { data } = await axios.post(
      `https://intuisense-mockserver.onrender.com/api/record/${id}`,
      body,
      config
    );
    setPlotImage(data.data.plot_image);
    setPlateImg(data.data.plate_image);
    setLoading(false);
    printIframe("print");
    
  };

  // api to get the data from the server by record Id
  const fetchData = async function () {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-isense-token":
          "17ba650ba063931c56a9f83d8a8018831304549fcc98d2a7ffefb27196c46965",
      },
    };
    const { data } = await axios.get(
      `https://intuisense-mockserver.onrender.com/api/record/${id}`,
      config
    );
    // console.log(data.data);
    setData(data.data);
    setNewOcr(data.data.ocr);
    setVehCategory(data.data.category);
    setVehType(data.data.type);
    setSelectedVioArr(data.data.violations);
    setAbleToEdit(!data.data.isValidated);
    setSendServer(!data.data.isSendtoServer);
    setPlotImage(data.data.plot_image);
    setPlateImg(data.data.plate_image);
    setLoading(false);
  };

  useEffect(() => {
    const printDoc = document.getElementById("print");
    const htmll = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>PrintChallan</title>
      <style>
      *{
        padding: 0px;
        margin: 0px;
    }
    
    
    .printMainContainer{
        /* width: 100%; */
        width: 600px;
        /* height: 100vh; */
        /* background-color: red; */
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 40px;
    }
    
    .logoImgClass{
        /* Frame 26085489 */
        width: 50px;
        height: 50px;
    
    background: #444444;
    border-radius: 100%;
    
    }
    
    .mainImgClass{
        width: 80%;
        /* height: 50%; */
    
        min-height: 400px;
    
        margin: 20px 0 5px;
    background: #444444;
    }
    
    .plateImgClass{
        width: 200px;
        height: 60px;
        background: #444444;
        margin: 0 auto 0 10%;
    }
    
    .allEnteries{
        width: 100%;
        margin:  20px 0;
    border-top: 0.3px solid #C4C4C4;
    }
    
    .allEnteries>div{
        padding: 30px 60px 0px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
        /* height: 80px; */
    }

    
    
    .allEnteries>div>label{
        /* Frame 26085519 */
    
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 20px;
    /* identical to box height */
    letter-spacing: -0.02em;
    
    color: #000000;
    
    
    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
    
    
    
    }
    
    .allEnteries>div>div{
        /* Line 6 */
    
        width: 70%;
    height: 100%;
    min-height:20px;
    
    border-bottom: 0.5px solid #DCDCDC;
    
    }
    
    .signP{
        /* Signature */
    
    
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 10px;
    /* identical to box height */
    letter-spacing: -0.02em;
    
    color: #000000;
    margin: 20px 0 0 auto;
    
    
    }
      </style>
    </head>
    <body>
    <div class="printMainContainer">
    <img class="logoImgClass" />
    <img class="mainImgClass" src="${plotImage}"/>
    <img class="plateImgClass" src="${plateImg}"/>
    <div class="allEnteries">
        <div>
            <label>Name -</label>
            <div></div>
        </div>
        <div>
            <label>DL No -</label>
            <div></div>
        </div>
        <div>
            <label>Address -</label>
            <div></div>
        </div>
        <div>
            <label>Contact No -</label>
            <div></div>
        </div>
        <div>
            <label>Location -</label>
            <div></div>
        </div><div>
            <label>Witness -</label>
            <div></div>
        </div>
    </div>
    <p class="signP">
        Signature
    </p>
</div></body>
</html>`;
    printDoc && printDoc.setAttribute("srcDoc", htmll);
    // console.log(printDoc);
  }, [plotImage, plateImg]);

  useEffect(() => {
    // setLoading(true);
    fetchData();
    // setLoading(false);
  }, [id]);

  const saveSetting = async function () {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-isense-token":
          "17ba650ba063931c56a9f83d8a8018831304549fcc98d2a7ffefb27196c46965",
      },
    };

    const body = {
      ocr: newOcr,
      violations: selectedVioArr,
      category: vehCategory,
      type: vehType,
    };

    const { data } = await axios.post(
      `https://intuisense-mockserver.onrender.com/api/record/${id}`,
      body,
      config
    );

    setData(data.data);
    setNewOcr(data.data.ocr);
    setVehCategory(data.data.category);
    setVehType(data.data.type);
    setSelectedVioArr(data.data.violations);
    setAbleToEdit(!data.data.isValidated);
    setSendServer(!data.data.isSendtoServer);
    setLoading(false);
  };

  const approveReq = async function (body, messageString) {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-isense-token":
          "17ba650ba063931c56a9f83d8a8018831304549fcc98d2a7ffefb27196c46965",
      },
    };

    const { data } = await axios.post(
      `https://intuisense-mockserver.onrender.com/api/record/${id}`,
      body,
      config
    );
    setInfoModal({
      message: messageString,
      setInfoModal: setInfoModal,
      onConfirm: () => {},
    });
    setData(data.data);
    setNewOcr(data.data.ocr);
    setVehCategory(data.data.category);
    setVehType(data.data.type);
    setSelectedVioArr(data.data.violations);
    setAbleToEdit(!data.data.isValidated);
    setSendServer(!data.data.isSendtoServer);
    setLoading(false);
  };

  const NotApprove = async function (message) {
    setLoading(true);
    setTimeout(() => {
      setInfoModal({
        message: message,
        setInfoModal: setInfoModal,
        onConfirm: () => {},
      });
    }, 0);
    setLoading(false);
  };

  const approveRecord = async function () {

    setInfoModal({
      message: "Do you want to approve this vehicle record?",
      setInfoModal: setInfoModal,
      booleanValue: booleanValue,
      setBooleanValue: setBooleanValue,
      body: { isValidated: true },
      confirmMessage: "The record has been approved.",
      notConfirmMessage: "The record has not been approved.",
      onConfirm: approveReq,
      onNotConfirm: NotApprove,
    });

  };

  const sendtToServer = async function () {

    setInfoModal({
      message: "Do you want to send this vehicle record to server?",
      setInfoModal: setInfoModal,
      booleanValue: booleanValue,
      setBooleanValue: setBooleanValue,
      body: { isValidated: true },
      confirmMessage: "The record has been sent to server.",
      notConfirmMessage: "The record has not been send to server.",
      body: { isSendtoServer: true },
      onConfirm: approveReq,
      onNotConfirm: NotApprove,
    });
  };

  const selectViolatioFromList = function (e) {
    if (selectedVioArr.includes(e.target.value)) {
      e.target.value = 0;
      return;
    }
    let newViolations = [...selectedVioArr, e.target.value];
    let remViolations = violationTypeArr.filter((d) => d !== e.target.value);
    setViolationTypeArr(remViolations);
    setSelectedVioArr(newViolations);
    e.target.value = 0;
  };

  const removeViolationFromList = function (e) {
    if (selectedVioArr.length === 1) {
      return;
    }
    const tarV = e.target.parentNode.parentNode.innerText;
    let newViolations = selectedVioArr.filter((d) => d !== tarV);
    let remViolations = [...violationTypeArr, tarV];
    setViolationTypeArr(remViolations);
    setSelectedVioArr(newViolations);
  };

  return (
    <>
      {data && (
        <div className="singleShowMainDiv">
          <div className="singleViewNav">
            <button
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setSingleView(null);
                setSingleView(null);
              }}
            >
              <img src={goBackNormal} />
            </button>
            <div>
              <button
                onClick={(e) => {
                  setSingleView(id + 1);
                }}

                // disabled={id === 1}
              >
                <img src={backIcon} />
              </button>
              <button
                onClick={(e) => {
                  setSingleView(id - 1);
                }}
              >
                Next
              </button>
            </div>
          </div>
          <div className="singleDivMainContent">
            <div className="crouselMainDiv">
              <div className="singleCrouselItem">
                <Carousel
                  autoPlay={true}
                  showThumbs={false}
                  swipeable={true}
                  showArrows={false}
                  className="crouselStyle"
                  infiniteLoop={true}
                  interval={5000}
                >
                  <div>
                    <img src={data.plot_image} />
                  </div>
                  <div>
                    <img src={data.original_image} />
                  </div>
                </Carousel>
              </div>
              <img src={data.plate_image} />
              <div className="locationDiv">
                <div>
                  <p>
                    <img src={lati} />
                    Latitude
                  </p>
                  <p>{data.lat}</p>
                </div>
                <div>
                  <p>
                    <img src={longi} />
                    Longitude
                  </p>
                  <p>{data.lon}</p>
                </div>
              </div>
            </div>
            <div className="detailsMainDiv">
              <div className="detailsInner">
                <div>
                  <img src={ocrIcon} />
                </div>
                <div>
                  <p>OCR</p>
                  {/* <p>{data.ocr}</p> */}
                  {editable ? (
                    <input
                      placeholder="Enter OCR"
                      value={newOcr}
                      onChange={(e) => {
                        setNewOcr(e.target.value);
                      }}
                    />
                  ) : (
                    <p>{newOcr}</p>
                  )}
                </div>
              </div>
              <div className="detailsInner">
                <div>
                  <img src={speedIcon} />
                </div>
                <div>
                  <p>Speed</p>
                  <p>{data.speed} KM/Hr</p>
                </div>
              </div>
              <div className="detailsInner">
                <div>
                  <img src={directIcon} />
                </div>
                <div>
                  <p>Direction</p>
                  <p>{data.direction}</p>
                </div>
              </div>
              <div className="detailsInner">
                <div>
                  <img src={timeStampIcon} />
                </div>
                <div>
                  <p>Date & Time</p>
                  <p>{setTimeString(data.created_at)}</p>
                </div>
              </div>
              <div className="detailsInner">
                <div>
                  <img src={vehCat} />
                </div>
                <div>
                  <p>Vehicle Category</p>
                  {editable ? (
                    <select
                      value={vehCategory}
                      onChange={(e) => {
                        setVehCategory(e.target.value);
                      }}
                    >
                      <option value={0}>Select a Category</option>
                      {Object.keys(vehCategoryObj).map((item, i) => {
                        return (
                          <option value={item}>{vehCategoryObj[item]}</option>
                        );
                      })}
                    </select>
                  ) : (
                    <p>{vehCategoryObj[vehCategory]}</p>
                  )}
                </div>
              </div>
              <div className="detailsInner">
                <div>
                  <img src={vehTypee} />
                </div>
                <div>
                  <p>Vehicle Type</p>
                  {editable ? (
                    <select
                      value={vehType}
                      onChange={(e) => {
                        setVehType(e.target.value);
                      }}
                    >
                      <option value={0}>Select a Category</option>
                      {vehTypeArr.map((ele) => {
                        return <option value={ele}>{ele}</option>;
                      })}
                    </select>
                  ) : (
                    <p>{vehType}</p>
                  )}
                </div>
              </div>
              <div className="detailsInner" style={{ width: "96%" }}>
                <div>
                  <img src={voilationIcon} />
                </div>
                <div>
                  <p className="voildationHead">Violation</p>
                </div>
                <div>
                  {editable && (
                    <select
                      className=""
                      onChange={(e) => {
                        selectViolatioFromList(e);
                      }}
                      disabled={violationTypeArr.length === 0}
                    >
                      <option value={0}>Select Violation</option>
                      {violationTypeArr.map((ele) => {
                        return (
                          <option
                            value={ele}
                            onClick={(e) => {
                              console.log(e);
                            }}
                          >
                            {ele}
                          </option>
                        );
                      })}
                    </select>
                  )}
                  <div className="selectedViolationDiv">
                    {selectedVioArr.map((vio) => {
                      return (
                        <div className="violationDiv" value={vio}>
                          {vio}
                          {editable && (
                            <button
                              onClick={(e) => {
                                removeViolationFromList(e);
                              }}
                            >
                              <img src={cross} />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {/**/}
                </div>
              </div>
              <div className="detailsBtnCont">
                {ableToEdit && (
                  <button
                    className="editOcrBtn"
                    onClick={(e) => {
                      if (editable) {
                        setEditable(false);
                        saveSetting();
                      } else {
                        let newVioll = violationTypeArr.filter((ele) => {
                          return !selectedVioArr.includes(ele);
                        });

                        setViolationTypeArr(newVioll);
                        setEditable(true);
                      }
                    }}
                  >
                    {editable ? "Save" : "Edit"}
                  </button>
                )}
                {!ableToEdit && (
                  <button
                    className="printBtn"
                    onClick={(e) => {
                      printChallan();
                    }}
                  >
                    Print
                  </button>
                )}
                {!ableToEdit && (
                  <button
                    onClick={(e) => {
                      sendtToServer();
                    }}
                    className={
                      sendServer
                        ? "approveOcrBtn"
                        : "approveOcrBtn approvedClass"
                    }
                    disabled={!sendServer}
                  >
                    {" "}
                    {sendServer ? "Send" : "Sended"}
                  </button>
                )}
                <button
                  className={
                    ableToEdit ? "approveOcrBtn" : "approveOcrBtn approvedClass"
                  }
                  disabled={!ableToEdit}
                  onClick={(e) => {
                    approveRecord();
                  }}
                >
                  {ableToEdit ? "Approve" : "Approved"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {infoModal && <InfoModal infoModal={infoModal} />}

      {plateImg ? (
        <iframe
          id="print"
          style={{ position: "absolute", top: "-1000px", left: "-1000px" }}
          title="Print Challan"
        />
      ) : (
        <p></p>
      )}
    </>
  );
};
