import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, authenication = true }) => {
  const authStatus = useSelector((state) => state.auth.status);

  const [loader, setLoader] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (authenication && authStatus !== authenication) {
      navigate("/login");
    } else if (!authenication && authStatus !== authenication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authenication]);

  return loader ? <h1>Loading ....</h1> : <>{children}</>;
};

export default AuthLayout;
