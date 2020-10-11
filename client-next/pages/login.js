import React from "react";
import Layout from "../components/layout/layout";
import styled from "styled-components";

const Container = styled.div`
  margin: 1rem;
  padding: 0.5rem 2rem 2rem;
  box-shadow: 0px 14px 44px -6px hsl(0, 0%, 75%);
  border-radius: 0.5rem 0.5rem 0.25rem 0.25rem;
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.colors.slateBlue_dark};
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.5rem;
  @media (min-width: 320px) {
    grid-template-columns: min-content 1fr;

    grid-gap: 1.5rem 1rem;
  }

  align-items: center;
`;

Form.Label = styled.label`
  color: hsl(0, 0%, 20%);
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;

  :not(:first-child) {
    margin-top: 0.5rem;
  }

  @media (min-width: 320px) {
    text-align: right;
    :not(:first-child) {
      margin-top: 0;
    }
  }
`;

Form.Input = styled.input`
  box-sizing: border-box;
  background-color: hsl(0, 0%, 30%);
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  width: 100%;

  :focus {
    background-color: ${({ theme }) => theme.colors.slateBlue_dark};
    outline: none;
  }

  ::placeholder {
    color: hsl(0, 0%, 80%);
  }
`;

Form.Button = styled.button`
  background-color: ${({ theme }) => theme.colors.slateBlue_medium};
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  color: hsl(0, 0%, 100%);
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  grid-column: 1 / -1;
  justify-self: right;
  cursor: pointer;

  margin-top: 1.5rem;

  @media (min-width: 320px) {
    margin-top: 0;
  }

  :focus,
  :hover {
    outline: none;
    background-color: ${({ theme }) => theme.colors.slateBlue_dark};
  }
`;

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
