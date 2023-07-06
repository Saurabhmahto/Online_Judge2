import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userContext from "../services/userContext";
import Cookies from "js-cookie";
import { SERVER_URL} from '../../config';

const jwtToken = Cookies.get("uid");



const Problem = () => {
  const [problem,setProblem]=useState([]);
  const [code,setCode]=useState('');
  const [input,setInput]=useState('');
  const [output,setOutput]=useState('Your output will be displayed here ');
  const { id } = useParams();
  useEffect(()=>{
    const getProblemById = async () => {
      const res = await fetch(`${SERVER_URL}/api/v1/problem/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": jwtToken,
        },
      });
      const data = await res.json();
      setProblem(data.payload);
    };
    getProblemById();
  },[])
  
  const handleProblemSubmit = async ()=>{
    setOutput('Program running');
    const body ={code,input};
    const res= await fetch(`${SERVER_URL}/api/v1/problem/${id}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "x-access-token": jwtToken,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setOutput(data);
  }
  return (
    <div className="flex flex-row h-[33.5rem] ">
      <div className="basis-3/5 px-1 flex flex-col border-r overflow-auto   border-r-black py-5">
        {problem?.map((problem, ind) =>
          problem.questionId === id ? (
            <div key={ind}
              dangerouslySetInnerHTML={{ __html: problem.description }}
            ></div>
          ) : (
            <div key={ind}></div>
          )
        )}
      </div>
      <div className="flex flex-col  basis-2/5 overflow-auto">
        <div className=" border border-[#abd8d8]">
          {" "}
          <div className="flex flex-row ">
            <div className="basis-1/5 font-mono text-center bg-gray-50 border-b border-b-neutral-300 py-3">
              main.cpp
            </div>
            <div className="flex justify-end  basis-4/5 border-b-2 border-b-[#906f3f] border-l-2 border-l-[#906f3f] ">
              <div className="bg-[#906f3f] px-2 py-2 font-serif cursor-pointer" onClick={handleProblemSubmit}>
                Run
              </div>
            </div>
          </div>
          <div className="px-4 py-2 h-[18rem]">
            <textarea
              className="w-full h-full border bg-gray-50  border-l-slate-100 outline-none resize-none"
              placeholder="Enter your cpp code here"
              spellCheck="false"
              value={code}
              onChange={(e)=>setCode(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-row ">
          <div className="basis-1/2 ">
            <div className="flex flex-row">
              <div className="basis-1/5 text-center bg-gray-50 border-b border-b-neutral-300 py-3">
                Input
              </div>
              <div className="basis-4/5 border-b-2 border-b-[#906f3f] border-l-2 border-l-[#906f3f]"></div>
            </div>
            <div className="px-2 py-2 h-full border-r border-r-[#906f3f]">
              <textarea
                className="w-full h-full border bg-gray-50  border-l-neutral-400 outline-none resize-none"
                placeholder="Enter your input"
                value={input}
                onChange={(e)=>setInput(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="basis-1/2">
            <div className="flex flex-row">
              <div className="basis-1/5 text-center bg-gray-50 border-b border-b-neutral-300 py-3">
                Output
              </div>
              <div className="basis-4/5 border-b-2 border-b-[#906f3f] border-l-2 border-l-[#906f3f]"></div>
            </div>
            <div className="flex flex-col px-4 pt-1  overflow-auto">
              {typeof output === 'object' && output !== null?<><div className="flex flex-col h-[8rem] overflow-auto"><div className="font-bold">Status:{output?.status}</div><div className="font-medium">{output?.msg}</div><div className="font-mono ">{output?.output}</div> </div></>:<div className="font-mono text-lg font-semibold h-[8rem] overflow-auto">{output}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem;
