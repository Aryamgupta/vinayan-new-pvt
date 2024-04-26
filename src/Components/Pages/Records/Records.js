import React, { useState } from "react";
import { Table } from "./Table/Table";
import { Grid } from "./Grid/Grid";
import exportIcon from "./Icons/exportIcon.png";
import fillterIcon from "./Icons/fillterIcon.png";
import refreshIcon from "./Icons/refreshIcon.png";
import gridV from "./Icons/gridV.png";
import listV from "./Icons/listV.png";
import page1 from "./Icons/pagination1.png";
import page2 from "./Icons/pagination2.png";

const Records = () => {
  const [gridView, setGridView] = useState(false);
  const [isfilter, setIsfilter] = useState(false);
  const [pagination, setPagination] = useState(1);

  const exportFunc = function (e) {
    console.log(e);
  };

  const prevBtn = async function () {
    if (pagination == 1) return;
    setPagination(pagination-1);
  };

  const nextBtn = async function () {
    if (pagination == 500) return;
    
    setPagination(pagination+1);
  };

  return (
    <>
      <div className="recordsMainDiv">
        <div className="recordNav">
          <div className="recordNavLeftPart">
            <div
              onClick={(e) => {
                setGridView(!gridView);
              }}
            >
              {gridView ? <img src={listV} /> : <img src={gridV} />}
            </div>
            <button
              onClick={(e) => {
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
        {!gridView ? <Table /> : <Grid />}
        {isfilter && <div>asdasd</div>}
      </div>
    </>
  );
};

export default Records;
