import React, { useContext, useEffect } from 'react';
import questionIcon from '../asset/img/question.svg'
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import userContext from '../services/userContext';


const problemsName=['Weird Algorithm','Missing Number','Repetitions','Increasing Array','Permutations','Number Spiral','Two Knights','Two Sets','Bit Strings','Trailing Zeros','Coin Piles','Palindrome Reorder','Gray Code','Weird Algorithm','Missing Number','Repetitions','Increasing Array','Permutations','Number Spiral','Two Knights','Two Sets','Bit Strings','Trailing Zeros','Coin Piles','Palindrome Reorder','Gray Code'];

const Home = () => {
  // const navigate = useNavigate();

  // useEffect( () => {
  //   const jwtToken = Cookies.get('uid');
  //   try {
  //     const decodedToken = jwtDecode(jwtToken);
  //     navigate('/');
  //   } catch (error) {
  //     navigate('/login');
  //   }
  // },[])

  return (
    <div className='flex flex-col pl-52 pr-44 '>
      <div className='font-sans text-3xl font-bold tracking-wider py-4 border-b border-black'><h1>Problem Set</h1></div>
      <div className='pt-4'>
        <h2 className='font-mono text-2xl font-bold'>Introductory Problems</h2>
        {problemsName.map((name,ind)=>{
          return (<div key={ind} className='flex font-sans font-semibold text-lg border-b border-gray-600 py-1'>
            <img src={questionIcon} className='h-7'></img>
            <div className='text-[#0000f1] border-b-2 border-[#0000f1] max-w-fit'> {name}</div>
            </div>)
        })}
      </div>
    </div>
  )
}

export default Home
