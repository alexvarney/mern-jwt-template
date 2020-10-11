import Layout from "../../components/layout/layout";
import { Container, Title, Form } from "../../components/pages/login/styles";

export default function LoginPage() {
  return (
    <Layout>
      <Container>
        <Title>Log In</Title>
        <Form>
          <Form.Label for="email">Email</Form.Label>
          <Form.Input id="email" placeholder="user@example.com"></Form.Input>
          <Form.Label for="password">Password</Form.Label>
          <Form.Input
            id="password"
            placeholder="*****"
            type="password"
          ></Form.Input>
          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    </Layout>
  );
}
