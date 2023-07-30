import React from "react"
// import "./home.css"
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
// import Help from '../Help';
// import Home from '../Home';
// import Profile from '../Profile';
// import Book from '../Book';

export default function Myapp({setLoginUser}){
  return(
    <div>
      <Navbar setLoginUser={setLoginUser} />
      <Outlet/>
    </div>
  );
}

{/* <div className="home">
<h1>Hello Homepage</h1>
<div className="button" onClick={() => setLoginUser({})} >Logout</div>
</div> */}