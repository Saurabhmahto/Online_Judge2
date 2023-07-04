import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "../services/userContext";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const handleUserlogout = ()=>{
  Cookies.remove('uid');
  window.location.reload();
}

const Header = () => {
  const { userName, setUserName } = useContext(userContext);

  if (userName === "") {
    const jwtToken = Cookies.get("uid");
    if (jwtToken) {
      try {
        const user = jwtDecode(jwtToken);
        setUserName(user?.username);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="flex flex-row justify-between px-3 py-2 bg-[#292929] ">
      <Link to="/">
        <div>
          <span
            className="font-logo font-bold text-3xl"
            style={{
              textShadow:
                "-1px 0 #906f3f, 0 1px #906f3f, 1px 0 #906f3f, 0 -1px #906f3f",
            }}
          >
            CODE
          </span>
          <span
            className="font-logo font-thin text-3xl"
            style={{
              textShadow:
                "-1px 0 #906f3f, 0 1px #906f3f, 1px 0 #906f3f, 0 -1px #906f3f",
            }}
          >
            {" "}
            MAZE
          </span>
        </div>
      </Link>
      <div className="flex flex-row gap-4 items-center ">
        {userName != "" ? (
          <>
            <div className="text-white font-sans cursor-pointer"><Link to='/add-problem' className="border-b border-b-white ">Add a problem</Link></div>
            <div className="text-white font-sans">{userName}</div>
            <div className="font-sans text-white bg-[#906f3f] px-2 h-7 rounded cursor-pointer" onClick={handleUserlogout}>
              LogOut
            </div>
          </>
        ) : (
          <>
            <div className="font-sans text-white cursor-pointer">
              <Link to="/login">Login </Link>
            </div>
            <div className="font-sans text-white bg-[#906f3f] px-2 h-7 rounded cursor-pointer">
              <Link to="/signup">Sign Up</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
