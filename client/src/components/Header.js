import React from "react";
import { Link } from "react-router-dom";



const Header = () => {
  return (
    <div className="flex flex-row justify-between px-3 py-2 bg-[#292929] ">
      <Link to="/">
      <div>
        <span className="font-logo font-bold text-3xl" style={{
           textShadow:"-1px 0 #906f3f, 0 1px #906f3f, 1px 0 #906f3f, 0 -1px #906f3f"
        }}>CODE</span>
        <span className="font-logo font-thin text-3xl" style={{
           textShadow:"-1px 0 #906f3f, 0 1px #906f3f, 1px 0 #906f3f, 0 -1px #906f3f"
        }}> MAZE</span>
      </div>
      </Link>
      <div className="flex flex-row gap-4 items-center ">
        <div className="font-sans text-white cursor-pointer"><Link to="/login">Login </Link></div>
        <div className="font-sans text-white bg-[#906f3f] px-2 h-7 rounded cursor-pointer"><Link to="/signup">Sign Up</Link></div>
      </div>
    </div>
  );
};

export default Header;
