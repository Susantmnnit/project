import './App.css'
import Myapp from "./components/home/home"
import Login from "./components/login/login"
import Register from "./components/register/register"
import { Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Help from './components/Help';
import Home from './components/Home';
import Profile from './components/Profile';
import Book from './components/Book';
import Payment from './components/payment/Payment';

function App() {

  const [ user, setLoginUser] = useState({});
  console.log('user state:',user);
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={user && user._id ? <Myapp setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />} >
            <Route exact path="/" element={<Home />} />
            <Route path="/Help" element={<Help />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Book" element={<Book />} />
              <Route path="/Payment" element={<Payment/>}/>
          </Route>
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </div>
  );
}

export default App;