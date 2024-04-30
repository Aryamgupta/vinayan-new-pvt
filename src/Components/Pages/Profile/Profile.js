import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Profile = ({setLoading}) => {
  const [oprInfo, setOprInfo] = useState({});
  const [editable, setEditable] = useState(false);

  const fetchProfileInfo = async function(){
    setLoading(true)
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-isense-token":"17ba650ba063931c56a9f83d8a8018831304549fcc98d2a7ffefb27196c46965"
      },
    };
    const {data} = await axios.get("https://intuisense-mockserver.onrender.com/api/profile",config);
    setOprInfo(data);
    setLoading(false)
  }

  const saveSetting = async function(){
    setLoading(true)
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-isense-token":"17ba650ba063931c56a9f83d8a8018831304549fcc98d2a7ffefb27196c46965"
      },
    };

    const {data} = await axios.post("https://intuisense-mockserver.onrender.com/api/profile",oprInfo,config);
    setOprInfo(data);
    setLoading(false)
  }

  useEffect(() => {
    fetchProfileInfo();
  }, [])

  return (
    <div className='profileMainComponent'>
      <div className='profileInpCont'>
        <label>Operator Name</label>
        <input type='text' disabled={!editable} value={oprInfo.op_name}
        onChange={(e)=>{
          let newOpr = {...oprInfo,op_name:e.target.value}
          setOprInfo(newOpr);
        }}
         placeholder='Enter operator name' className=''/>
      </div>
      <div className='profileInpCont'>
        <label>Operator ID</label>
        <input type='text' disabled={!editable}  value={oprInfo.op_id} 
        onChange={(e)=>{
          let newOpr = {...oprInfo,op_id:e.target.value}
          setOprInfo(newOpr);
        }}
         placeholder='Enter operator ID' className=''/>
      </div>
      <div className='profileInpCont'>
        <label>Department</label>
        <input type='text' disabled={!editable} value={oprInfo.dept}
        onChange={(e)=>{
          let newOpr = {...oprInfo,dept:e.target.value}
          setOprInfo(newOpr);
        }}
        placeholder='Enter department' className=''/>
      </div>
      <div className='profileInpCont'>
        <label>Location</label>
        <input type='text' disabled={!editable} value={oprInfo.location}
        onChange={(e)=>{
          let newOpr = {...oprInfo,location:e.target.value}
          setOprInfo(newOpr);
        }}
        placeholder='Enter location' className=''/>
      </div>

      <div className='profileBtnCont'>
      <button className='majorEditBtn' onClick={(e)=>{
        if(editable){
          setEditable(false);
          saveSetting(e);
          
        }
        else{
          setEditable(true);
        }
      }}>{!editable?"Edit":"Save"}</button>
      </div>
    </div>
  )
}

export default Profile
