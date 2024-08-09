import React, { useContext, useEffect, useState } from "react";
import profileImg from "../assets/images/user.png";
import { Button, Spinner } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../hooks/baseURL";
import { toast } from "react-toastify";


const ProfilePage = () => {
  const { auth, lan, user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const profile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const inputData = {
      name: name,
      phone: phone,
    };
    try {
      const response = await fetch(BASE_URL + "/profile", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) {
        setLoading(false);
        let errorData = await response.json().catch(() => ({}));

        if (response.status === 422) {
          setErrMsg("");
          setError(errorData.errors || "Unknown error");
        } else if (response.status === 401) {
          setError("");
          setErrMsg(errorData.message || "Unauthorized");
        } else {
          throw new Error("Change Password Failed");
        }

        throw new Error("Change Password Failed");
      }

      const data = await response.json();

      if (response.status === 200) {
        toast.success("Profile updated successfully.", {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
          hideProgressBar: false,
          closeOnClick: true,
        });
        updateProfile(data.data);
        setLoading(false);
        setSuccess("Profile updated successfully");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className=" px-2 px-4 px-lg-5 pb-5 mb-5">
      <h3 className="fw-semibold mb-4 text-center">{lan === "en" ? "Profile" : "ပရိုဖိုင်" }</h3>
      <div className="customForm">
        <div className="text-center">
          <img className="user my-2 rounded-5" src={profileImg} />
          {success && <p className="text-center text-success">***{success}***</p>}
          {errMsg && <p className="text-center text-danger">{errMsg}</p>}
          
        </div>
        <form onSubmit={profile}>
            <div className="mb-5">
              <p className="mb-1">{lan === "en" ? "Name" : "အမည်" }</p>
              <input 
              type="text" 
              className="form-control bg-transparent text-white border-bottom-1 border-top-0 border-start-0 border-end-0" 
              onChange={e => setName(e.target.value)}
              value={name}
              />
            </div>
            <div className="mb-5">
              <p className="mb-1">Phone Number</p>
              <input 
              type="text"  
              className="form-control bg-transparent text-white border-bottom-1 border-top-0 border-start-0 border-end-0"
              onChange={e => setPhone(e.target.value)}
              value={phone}
              />
            </div>
            <Button className="w-full" variant="outline-light" type="submit">
              {loading && <Spinner size="sm" className="me-2" />}
              {lan === "en" ? "Update" : "ပြောင်းသည်"}
            </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
