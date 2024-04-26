
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CameraSetting = () => {
  const [editable, setEditable] = useState(false);
  const [rtspUrl, setRtspUrl] = useState("");

  const fetchRTSPURl = async function(){
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-isense-token":"17ba650ba063931c56a9f83d8a8018831304549fcc98d2a7ffefb27196c46965"
      },
    };

    const {data} = await axios.get("https://intuisense-mockserver.onrender.com/api/rstpconfig",config);
    setRtspUrl(data.rstp_url);
  }
  

  const saveRtspUrl = async function(){
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-isense-token":"17ba650ba063931c56a9f83d8a8018831304549fcc98d2a7ffefb27196c46965"
      },
    };

    const body = {
      "rstp_url":rtspUrl
    }

    const {data} = await axios.post("https://intuisense-mockserver.onrender.com/api/rstpconfig",body,config);
    setRtspUrl(data.rstp_url);

  }

  useEffect(() => {
    fetchRTSPURl();
  }, [])

  return (
    <div className='CameraMainDiv'>
      <div>
        <label className='majorLabel'>Camera RSTP URL</label>
        <input className='majorInpFeild' placeholder='Enter Url'
        disabled={!editable}
        value={rtspUrl}
        onChange={(e)=>setRtspUrl(e.target.value)}
        />
      </div>
      <div>
        <button onClick={(e)=>{
          if(editable){
            setEditable(false);
            saveRtspUrl();
          }
          else{
            setEditable(true);
          }
        }} 
        className='majorEditBtn'>{editable ?"Save":"Edit"}</button>
      </div>
    </div>
  )
}

export default CameraSetting
