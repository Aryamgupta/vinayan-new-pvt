import React, { useState } from "react";
import directIcon from '../Icons/direction.png';
import gifIcon from '../Icons/gif.png';
import ocrIcon from '../Icons/ocr.png';
import speedIcon from '../Icons/sppedicon.png';
import timeStampIcon from '../Icons/timeStamp.png';
import vehCatICon from '../Icons/vehCat.png';
import veiwIcon from '../Icons/view.png';
import vehImg from '../Icons/vehImg.png'
import { GifOverlay } from "../GifOverlay";


export const Table = ({data,setTimeString,vehCategoryObj,setSingleView}) => {

  const [gifOverLaySrc, setGifOverLaySrc] = useState(null);
  return (
    <div className="tableMainDiv">
      <table>
        <thead className="tableHeader">
          <tr >
            <th>ID</th>
            <th><div className="headwithIcon"><img src={vehImg}/>Vehicle</div></th>
            <th><div className="headwithIcon"><img src={vehCatICon}/>Vehicle Category</div></th>
            <th><div className="headwithIcon"><img src={ocrIcon}/>OCR</div></th>
            <th><div className="headwithIcon"><img src={speedIcon}/>Speed</div></th>
            <th><div className="headwithIcon"><img src={directIcon}/>Direction</div></th>
            <th><div className="headwithIcon"><img src={gifIcon}/>GIF</div></th>
            <th><div className="headwithIcon"><img src={timeStampIcon}/>Timestamp</div></th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d)=>{
            return (
              <tr>
            <td><div className="cellInnncerClass">{d.rid}</div></td> 
            <td><div className=""><img src={d.plot_image}/></div></td>
            <td><div className="cellInnncerClass">{vehCategoryObj[d.category]}</div></td>
            <td><div className="cellInnncerClass">{d.ocr}</div></td>
            <td><div className="cellInnncerClass">{d.speed} KM/Hr</div></td>
            <td><div className="cellInnncerClass">{d.direction}</div></td>
            <td><div className="cellInnncerClass" style={{cursor:"pointer"}} onClick={(ev)=>{
              setGifOverLaySrc(d.plate_image);
            }}>GIF</div></td>
            <td><div className="cellInnncerClass">{setTimeString(d.created_at)}</div></td>
            <td onClick={()=>{
              setSingleView(d.rid);
            }}><img src={veiwIcon}/></td>
          </tr>
            )
          })}
        </tbody>
      </table>
      {gifOverLaySrc && <GifOverlay imageSrc={gifOverLaySrc} setGifOverLaySrc={setGifOverLaySrc}/>}
    </div>
  );
};
