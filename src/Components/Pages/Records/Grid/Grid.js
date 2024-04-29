import React from "react";


export const Grid = ({ data, setTimeString, vehCategoryObj ,setSingleView }) => {

  return (
    <div className="mainGridDiv">
      {data.map((e) => {
        return (
          <div className="mainGridItem" 
          onClick={()=>{
            setSingleView(e.rid);
          }}
          >
            <div>
              <div>{vehCategoryObj[e.category]}</div>
              <img src={e.plot_image}/>
              <div>{setTimeString(e.created_at)}</div>
            </div>
            <p>
              <span>ID -</span>
              <span>{e.rid}</span>
            </p>
            <p>
              <span>OCR -</span>
              <span>{e.ocr}</span>
            </p>
            <p>
              <span>Speed -</span>
              <span>{e.speed} KM/Hr</span>
            </p>
            <p>
              <span>Direction -</span>
              <span>{e.direction}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
};
