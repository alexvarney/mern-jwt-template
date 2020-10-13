import { useState, useContext } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/layout/layout";
import withLogin from "../../components/util/withLogin";
import { Container, Title, Form } from "../../components/pages/login/styles";
import Auth from "../../components/util/auth";

function LoginPage(props) {
  const router = useRouter();
  const [authState, authActions] = useContext(Auth);

  const [passwordInput, setPasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    authActions.login(emailInput, passwordInput).then((data) => {
      if (data.token) {
        router.push("/profile");
      }
    });
  };

  return (
    <Layout>
      <Container>
        <Title>Log In</Title>
        <Form onSubmit={handleLoginSubmit}>
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

export default withLogin(LoginPage, (_, user) =>
  user._id ? "/profile" : null
);
