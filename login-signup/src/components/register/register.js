import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = () => {

    const navigate = useNavigate()

    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        cpassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, cpassword } = user
        if( name && email && password && (password === cpassword)){
            axios.post("/register", user)
            .then( res => {
                alert(res.data.message)
                navigate("/login")
            })
        } else {
            alert("invalid input")
        }
        
    }

    return (
        <div className="register-page">
        <div className="register-container">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input type="password" name="cpassword" value={user.cpassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/login")}>Login</div>
        </div>
        </div>
    )
}

export default Register

// const [ user, setUser] = useState({
    //     name: "",
    //     email:"",
    //     password:"",
    //     cpassword: ""
    // })

    // const handleChange = e => {
    //     const { name, value } = e.target
    //     setUser({
    //         ...user,
    //         [name]: value
    //     })
    // }

    // const register = () => {
    //     const { name, email, password, cpassword } = user
    //     if( name && email && password && (password === cpassword)){
    //         axios.post("http://localhost:8000/register", user)
    //         .then( res => {
    //             alert(res.data.message)
    //             navigate("/login")
    //         })
    //     } else {
    //         alert("invalid input")
    //     }
        
    // }