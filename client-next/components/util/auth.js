import React, { useReducer } from "react";
import { useCookies } from "react-cookie";

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
        };
      default:
        return prevState;
    }
  };

  const initialState = {
    isLoggedIn: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const actions = {
    handleLogin: (token) => {
      setCookie("jwt", token, { path: "/" });
      dispatch({ type: "LOGIN" });
    },
    handleLogout: () => {
      removeCookie("jwt");
      dispatch({ type: "LOGOUT" });
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
