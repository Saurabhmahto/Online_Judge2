import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async() => {
   const user ={
    username,
    password
   };
   const res= await fetch('http://localhost:8000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const jsonRes=await res.json();
    toast.error(jsonRes?.msg);
    if(jsonRes.success==='true'){
      Cookies.set('uid', jsonRes?.jwt);
      navigate('/');
    }
    
  };
  return (
    <div className="flex flex-col  box-border w-full  pl-40 pr-20">
      <div className="">
        <div className="flex font-sans text-2xl font-bold py-4 border-b border-b-black">
          Login
        </div>
        <div className="flex flex-col py-5">
          <div className="w-4/6 px-3 py-4 flex flex-col border border-gray-300">
            <p className="font-sans font-medium">Username:</p>
            <div className="w-max border border-black rounded">
              <input
                type="text"
                spellCheck="false"
                className="outline-none rounded"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <p className="font-sans font-medium mt-4">Password:</p>
            <div className="w-max border border-black rounded">
              <input
                type="password"
                className="outline-none rounded"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="w-max px-4 py-1 rounded my-3 bg-[#efefef]">
            <button className="cursor-pointer" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
