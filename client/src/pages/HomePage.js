import React, { useContext, useEffect } from "react";
import Landing from "./Landing";
import MainPage from "./MainPage";
import authContext from "../context/auth/authContext";

const HomePage = () => {
  const { isLoggedIn } = useContext(authContext);

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  if (!isLoggedIn) return <Landing />;
  else return <MainPage />;
};

export default HomePage;
