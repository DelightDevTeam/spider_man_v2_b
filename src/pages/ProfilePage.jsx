import React, { useContext, useEffect } from "react";
import user from "../assets/images/user.png";
import { Button } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


const ProfilePage = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);

  return (
    <div className=" px-2 px-4 px-lg-5 pb-5 mb-5">
      <h3 className="fw-semibold mb-4 text-center">Profile</h3>
      <div className="customForm">
        <div className="text-center">
          <img className="user my-2 rounded-5" src={user} />
        </div>
        <div className="mb-3">
          <p className="mb-1">Username</p>
          <input type="text" value={"User1323"} className="form-control" />
        </div>
        <div className="mb-3">
          <p className="mb-1">Phone Number</p>
          <input type="text" value={"09123456"} className="form-control" />
        </div>
        <Button className="w-full" variant="outline-primary">
          Update Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
