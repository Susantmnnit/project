import React,{useState,useEffect} from 'react';
import './Profile.css';
import { useNavigate } from "react-router-dom"

export default function Profile() {

  const navigate = useNavigate();
  const [userData, setUserData]=useState('');

  const callAboutPage = async ()=>{
    try{
      const res=await fetch('/profile',{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type": "application/json"
        },
        credentials:"include"
      });
      console.log("ami-profile");
      
      const data = await res.json();
      if(!data){
        throw new Error("No data");
      }
      console.log(data);
      setUserData(data);

      if(!res.status===400 || !data){
          const error=new Error(res.error);
          throw error;
      }
    }catch(err){
      console.log(err);
      navigate("/login");
    }
  }

  useEffect (()=>{
    callAboutPage();
  },[]);

  return (
    <div>
      <div className='Profile-page'>
      <div className='Profile-page-header'>
            <h3>Profile</h3>
      </div>
      <div className='Profile-page-details'>
            <h3>Update Details</h3>
      </div>
      <div className='details-form'>
        <form className='login-form'>
            <label>Name:</label>
            <input id="i-1" type='text' placeholder={userData.name}/><br/>
            <label>Email Id:</label>
            <input id="i-2" type='email' placeholder={userData.email}/><br/>
            <label>Mobile No:</label>
            <input id="i-3" type='string' placeholder='enter mobile number'/><br/>
            <label>Address:</label><br/>
            <textarea id="i-5" type="text" rows={5} cols={23} placeholder='Enter address'/><br/>
            <div className='button'>
                <input type="submit" value="Edit"/>
            </div>
        </form>
      </div>
    </div>
    </div>
  );
}
