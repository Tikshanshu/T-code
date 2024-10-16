import React, { useState } from "react";
import logo from "../Images/logo.png";
import signupimage from "../Images/authPageSide.png"
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pad, setPad] = useState("");
  const [name, setName] = useState("");

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(username,email,pad,name);
  }

  return (
    <>
      <div className="w-screen min-h-screen flex items-center justify-between pl-[100px]">

        <div className="left w-[40%]">
          <img className="w-[200px]" src={logo} alt="Logo" />
          <form onSubmit={handleSubmit} className="w-full mt-[60px]" action="">
            <div className="inputBox">
              <input required onChange={(e)=>{setUsername(e.target.value)}} type="text" placeholder="Username" value={username} />
            </div>
            <div className="inputBox">
              <input required  onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Name" value={name} />
            </div>
            <div className="inputBox">
              <input required  onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Email"  value={email}/>
            </div>
            <div className="inputBox">
              <input  required onChange={(e)=>{setPad(e.target.value)}} type="password" placeholder="password" value={pad}/>
            </div>
            <p className="text-[gray] ml-[10px]">Already have an account <Link id="loginlink" to="/login" className="text-[#00AEEF] " >Login</Link></p>
            <button className="btnBlue w-full mt-[20px]">Sign Up</button> 
          </form>
        </div>

        <div className="right w-[55%]">
          <img className='h-[100vh] w-[100vw] object-fit-[cover]' src={signupimage} alt="" />
        </div>
      </div>
    </>
  );
};

export default SignUp;
