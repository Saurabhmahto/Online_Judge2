import React, { useContext, useEffect, useState } from "react";
import questionIcon from "../asset/img/question.svg";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../services/userContext";
import { toast } from "react-toastify";
import { SERVER_URL} from '../../config';

const jwtToken = Cookies.get("uid");
const Home = () => {
  const { userProblemSet, setUserProblem } = useContext(userContext);

  useEffect(() => {
    const getAllProblems = async () => {
      const res = await fetch(`${SERVER_URL}/api/v1/problem`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": jwtToken,
        },
      });
      const data = await res.json();
      if(data?.status==='error'){
          toast.error(data?.msg)
      }
      else{
       
        setUserProblem(data.payload);
      }
    };
    getAllProblems();
  }, []);

  return (
    <div className="flex flex-col pl-52 pr-44 ">
      <div className="font-sans text-3xl font-bold tracking-wider py-4 border-b border-black">
        <h1>Problem Set</h1>
      </div>
      <div className="pt-4">
        <h2 className="font-mono text-2xl font-bold">Introductory Problems</h2>
        {userProblemSet?.map((problem, ind) => {
          return (
            <div
              key={ind}
              className="flex font-sans font-semibold text-lg border-b border-gray-600 py-1"
            >
              <img src={questionIcon} className="h-7"></img>
              <div className="text-[#0000f1] border-b-2 border-[#0000f1] max-w-fit">
                <Link to={`/problem/${problem?.questionId}`}>
                  {problem?.name}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
