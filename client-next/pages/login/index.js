import { useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

import Config from "../../config";
import Layout from "../../components/layout/layout";
import withLogin from "../../components/util/withLogin";
import { Container, Title, Form } from "../../components/pages/login/styles";

const LOGIN_ENDPOINT = `${Config.API_ENDPOINT}${Config.LOGIN}`;

function LoginPage({ user }) {
  const router = useRouter();

  const [cookies, setCookie] = useCookies(["jwt"]);

  const [passwordInput, setPasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(emailInput, passwordInput);

    fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ email: emailInput, password: passwordInput }),
    })
      .catch((error) => console.error(error))
      .then((res) => res.json())
      .then((data) => {
        console.log("success");
        if (data.token) {
          setCookie("jwt", data.token, { path: "/" });
        }
      });
  };

  return (
    <Layout>
      <Container>
        <Title>Log In</Title>
        <Form onSubmit={handleFormSubmit}>
          <Form.Label for="email">Email</Form.Label>
          <Form.Input
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            id="email"
            placeholder="user@example.com"
          ></Form.Input>
          <Form.Label for="password">Password</Form.Label>
          <Form.Input
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            id="password"
            placeholder="*****"
            type="password"
          ></Form.Input>
          <Form.Button type="submit">Submit</Form.Button>
        </Form>
      </Container>
    </Layout>
  );
}

export default withLogin(LoginPage, "/profile");
