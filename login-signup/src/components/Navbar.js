import React,{useState, useEffect, useRef} from 'react';
import './Navbar.css';
import {Link} from "react-router-dom";
import portrait from "../img/portrait.png";
import user from "../img/user.png";
import logout from "../img/logout.jpg";

const Navbar = ({setLoginUser}) => {

  const [open, setOpen] = useState(false);
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        console.log(menuRef.current);
      }      
    };
    document.addEventListener("mousedown", handler);
    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

  return (
    <>
    <nav className="navbar">
      <div className='menu-container' ref={menuRef}>
        <div className="logo" onClick={()=>{setOpen(!open)}}>
          <Link to="/"><img src={portrait} alt="Logo" /></Link>
        </div>
        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
          <h3>Name</h3>
          <ul>
            <Link to="/Profile"><Dropdown img={user} text={"My Profile"}/></Link>
            <Dropdown img={logout} text={"Logout"} onClick={() => setLoginUser({})}/>
          </ul>
        </div>
      </div>
      <div className="search-bar">
        <h3>Welcome Couples</h3>
      </div>
      <div className="navbar-icons">
        <div className="icon" >
          <Link to="/help">Help</Link>
        </div>
      </div>
    </nav>
    {/* <Outlet/> */}
    </>
  );
}

function Dropdown(props){
  return(
    <li className='dropdown-item'>
      <img src={props.img} alt="img:-.:"></img>
      <a href="/">{props.text}</a>
    </li>
  );
}
export default Navbar
