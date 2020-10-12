import { useContext } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";
import Config from "../../config";
import withLogin from "../../components/util/withLogin";
import { useCookies } from "react-cookie";
import Auth from "../../components/util/auth";

const LOGOUT = `${Config.API_ENDPOINT}${Config.LOGOUT}`;

import styled from "styled-components";

const LogoutButton = styled.button`
  display: block;
  border: none;
  background-color: transparent;
  color: #1990eb;
  padding: 0;
  cursor: pointer;
  margin-bottom: 1rem;

  :hover {
    color: #146fb5;
  }
`;

function ProfilePage({ error, user }) {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const router = useRouter();
  const [authState, authActions] = useContext(Auth);

  const onLogout = (e) => {
    e.preventDefault();

    fetch(LOGOUT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: cookies.jwt,
      },
    }).then((res) => {
      authActions.handleLogout();
      router.push("/login");
    });
  };

  return (
    <Layout>
      <h3>Profile Page</h3>
      <LogoutButton onClick={onLogout}>Log Out</LogoutButton>
      <h1 style={{ display: "inline" }}>{user.name}</h1>
      <p style={{ display: "inline", marginLeft: "1rem" }}>
        <code>{user._id}</code>
      </p>
      <p>[{user.role}]</p>
      <p>{user.email}</p>
    </Layout>
  );
}

export default withLogin(ProfilePage, (_, user) =>
  user._id ? null : "/login"
);
