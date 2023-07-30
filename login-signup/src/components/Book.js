import React, { useState } from 'react'
import './Booking.css'
// import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function Book() {

  const navigate=useNavigate();

  const [user,setUser]=useState({name:"",pname:"",adhar:"",padhar:"",address:"",table:""});

  const handleDetails = e =>{
    const { name , value} = e.target;

    setUser({
      ...user,
      [name]:value
    })
  }
  const saveDetails = async (e) => {
    e.preventDefault();
  
    const { name, pname, adhar, padhar, address, table } = user;
  
    const res = await fetch('/details', {
      method: 'POST', 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, pname, adhar, padhar, address, table
      })
    });
  
    const data = await res.json();
  
    if (!data) {
      console.log("data not filled correctly");
    } else {
      alert("Your booking is successfull");
      setUser({ ...user, name: "", pname: "", adhar: "", padhar: "", address: "", table: "" });
      navigate('/Payment');
    }
  }
  

  return (
    <div className='booking-page'>
      <div className='booking-page-header'>
            <h3>Booking Page</h3>
      </div>
      <div className='booking-page-details'>
            <h3>Enter Your & Your's Partner Details</h3>
      </div>
      <div className='booking-details-form'>
        <form methode='POST' className='booking-login-form'>
            <label>Name:</label>
            <input id="i-1" type='text' name="name" value={user.name} placeholder='enter name' onChange={handleDetails}/><br/>
            <label>Partner Name:</label>
            <input id="i-2" type='text' name="pname" value={user.pname} placeholder='enter partner name' onChange={handleDetails}/><br/>
            <label>Your Id:</label>
            <input id="i-3" type='string' name="adhar" value={user.adhar} placeholder='enter your adhar id' onChange={handleDetails}/><br/>
            <label>Your Partner Id:</label>
            <input id="i-4" type='string' name="padhar" value={user.padhar} placeholder='enter partner adhar id' onChange={handleDetails}/><br/>
            <label>Address:</label><br/>
            <textarea id="i-5" type="text" name="address" value={user.address} rows={5} cols={23} placeholder='Enter address' onChange={handleDetails}/><br/>
            <label>Table:</label>
            <input id="i-6" type="text" name="table" value={user.table} placeholder='table no' onChange={handleDetails}/><br/>
            <div className='button'>
                <input type="submit" onClick={saveDetails} value="Submit"/>
            </div>
        </form>
      </div>
    </div>
  );
}
