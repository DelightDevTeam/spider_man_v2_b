import React, { useContext, useEffect, useState } from "react";
import profileImg from "../assets/images/user.png";
import { Button, Spinner } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../hooks/baseURL";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { MdOutlineLockPerson } from "react-icons/md";
 
const ProfilePage = () => {
  const {user,auth} = useAuth();
  
  if(auth) return (
    <div className=" px-2 px-4 px-lg-5 pb-5 mb-5">
      <h3 className="fw-semibold mb-4 text-center">Profile</h3>
      <div className="customForm">
        <div className="text-center">
          <img className="user my-2 rounded-5" src={profileImg} />
          </div>
        <form >
            <div className="mb-5">
              <p className="mb-1">Name</p>
              <input 
              readOnly
              type="text" 
              className="form-control bg-transparent text-white border-bottom-1 border-top-0 border-start-0 border-end-0" 
               value={user?.name}
              />
            </div>
            <div className="mb-5">
              <p className="mb-1">Phone Number</p>
              <input 
              readOnly
              type="text"  
              className="form-control bg-transparent text-white border-bottom-1 border-top-0 border-start-0 border-end-0"
               value={user?.phone}
              />
            </div>
            {/* <Button className="w-full" variant="outline-light" type="submit">
              {loading && <Spinner size="sm" className="me-2" />}
              {lan === "en" ? "Update" : "ပြောင်းသည်"}
            </Button> */}
        </form>
        <div className="text-center">
         <Link to={'/change-password'}>
         <button className="mt-4 w-full text-white border border-white rounded-3 text-center py-2 px-4"> 
            <MdOutlineLockPerson size={26} /> Change Password
          </button>
         </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
