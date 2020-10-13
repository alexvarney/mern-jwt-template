import React, { useReducer } from "react";
import { useCookies } from "react-cookie";
import Config from "../../config";

const LOGIN_ENDPOINT = `${Config.API_ENDPOINT}${Config.LOGIN}`;
const LOGOUT_ENDPOINT = `${Config.API_ENDPOINT}${Config.LOGOUT}`;

const AuthContext = React.createContext();

function useAuth() {
  const [cookies, setCookie, removeCookie] = useCookies("jwt");

  const authReducer = (prevState, action) => {
    const { type, payload } = action;
    switch (type) {
      case "LOGIN":
        return {
          ...prevState,
          isLoggedIn: true,
        };
      case "LOGOUT":
        return {
          ...prevState,
          isLoggedIn: false,
          user: {},
        };
      case "SET_USER":
        return {
          ...prevState,
          user: payload,
        };
      default:
        return prevState;
    }
  };

  const initialState = {
    isLoggedIn: false,
    user: {},
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const actions = {
    handleLogin: (token) => {
      if (token) setCookie("jwt", token, { path: "/" });
      dispatch({ type: "LOGIN" });
    },
    handleLogout: () => {
      removeCookie("jwt");
      dispatch({ type: "LOGOUT" });
    },
    setUser: (user) => {
      dispatch({ type: "SET_USER", payload: user });
    },
    login: async (email, password) => {
      let data = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      data = await data.json();
      if (data.token) {
        setCookie("jwt", data.token, { path: "/" });
        dispatch({ type: "LOGIN" });
        dispatch({ type: "SET_USER", payload: data.user });
      }
      return data;
    },
    logout: async () => {
      const result = await fetch(LOGOUT_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: cookies.jwt,
        },
      });
      removeCookie("jwt");
      dispatch({ type: "LOGOUT" });
      return result;
    },
  };

  return [state, actions];
}

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={useAuth()}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
