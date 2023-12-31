import React, { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { SERVER_URL} from '../../config';



const task = () => {
  const [problemName,setProblemName]=useState('');
  const jwtToken = Cookies.get("uid");
  const handleProblemName = async()=>{
    const name ={
      name:problemName.toLowerCase().replace(/\s/g, '-')
    };
    const res =await fetch(`${SERVER_URL}/api/v1/problem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token':jwtToken,
      },
      body: JSON.stringify(name),
    });
    const data =await res.json();
    if(data.status==='error'){
      toast.error(data?.msg);
    }
    else{
      toast.info(data?.msg);
    }
  }

  return (
    <div className="flex flex-col justify-center h-96  items-center ">
      <div className="flex flex-col border-2 border-black  h-3/4 w-96 drop-shadow-2xl items-center">
        <div className="font-mono font-semibold text-2xl py-3">
          Add <span className="text-[#906f3f]">Leetcode</span> problem
        </div>
        <div className=" flex flex-col items-center py-4">
          <h2 className="font-sans font-medium text-lg py-2">Problem name:</h2>
          <div className="w-max border border-black rounded">
            <input type="text" className="outline-none rounded " onChange={(e)=>setProblemName(e.target.value)}/>
          </div>
          <div className="mt-3 px-2 py-1 font-sans font-medium rounded text-white bg-[#906f3f] cursor-pointer" onClick={handleProblemName}>Add</div>
        </div>
      </div>
    </div>
  );
};

export default task;
