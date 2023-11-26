import { useEffect, useState, useContext } from "react";
import pokerClient from "../helpers/axios";
import setAuthToken from "../helpers/setAuthToken";
import globalContext from "../context/global/globalContext";
import axios from "axios";

const useAuth = () => {
  localStorage.token && setAuthToken(localStorage.token);
  const {
    setId,
    setIsLoading,
    setUserName,
    setEmail,
    nativeToken,
    setChipsAmount,
    setBalance,
    ethPrice,
  } = useContext(globalContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.token;
    token && loadUser(token);
    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  const register = async ({ name, email, password }) => {
    setIsLoading(true);
    try {
      const res = await pokerClient.post("/api/users", {
        name,
        email,
        password,
      });
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setAuthToken(token);
        await loadUser(token);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const login = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const res = await pokerClient.post("/api/auth", {
        email: email,
        password,
      });
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setAuthToken(token);
        await loadUser(token);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const loadUser = async (token) => {
    try {
      const res = await pokerClient.get("/api/auth");
      if (res.data) {
        const { _id, name, email, balance, chipsAmount } = res.data;
        setIsLoggedIn(true);
        setId(_id);
        setUserName(name);
        setEmail(email);
        // const res = await axios.get(
        //   "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        // );
        // console.log(res);
        setBalance(
          balance.data.find((coin) => coin.coinType === nativeToken).balance *
            ethPrice
        );
        setChipsAmount(chipsAmount);
      } else {
        localStorage.removeItem(token);
      }
    } catch (error) {
      localStorage.removeItem(token);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setId(null);
    setUserName(null);
    setEmail(null);
    setChipsAmount(null);
  };

  return [isLoggedIn, login, logout, register, loadUser];
};

export default useAuth;
