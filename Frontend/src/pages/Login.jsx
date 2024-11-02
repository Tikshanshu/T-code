import React, { useState } from "react";
import logo from "../Images/logo.png";
import signupimage from "../Images/authPageSide.png"
import { Link, useNavigate } from "react-router-dom";
import { api_base_url } from "../Helper";  // for Backend API  endpoint

const Login = () => {
 
  const [email, setEmail] = useState("");
  const [pad, setPad] = useState("");
  const [er, setEr] = useState("");

  const navigate=useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/login",{
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: pad
      })
    }).then(res => res.json()).then(data => {
      if(data.success === true){
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userId", data.userId);
        setTimeout(() => {
          window.location.href = "/"
        }, 200);
      } else {
        setEr(data.message);
      }
    })
  }
  return (
    <>
      <div className="w-screen min-h-screen flex items-center justify-between pl-[100px]">

        <div className="left w-[40%]">
          <img className="w-[200px]" src={logo} alt="Logo" />
          <form onSubmit={handleSubmit} className="w-full mt-[60px]" action="">
            <div className="inputBox">
              <input required  onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Email"  value={email}/>
            </div>
            <div className="inputBox">
              <input  required onChange={(e)=>{setPad(e.target.value)}} type="password" placeholder="password" value={pad}/>
            </div>
            <p className="text-[gray] ml-[10px]">Don't have an account <Link id="loginlink" to="/SignUp" className="text-[#00AEEF] " >Create</Link></p>
            <p className='text-red-500 text-[14px] my-2'>{er}</p>
            <button className="btnBlue w-full mt-[20px]">Login</button> 
          </form>
        </div>

        <div className="right w-[55%]">
          <img className='h-[100vh] w-[100vw] object-fit-[cover]' src={signupimage} alt="" />
        </div>
      </div>
    </>
  );
};

export default Login;
