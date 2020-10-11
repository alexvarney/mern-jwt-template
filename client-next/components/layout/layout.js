import React from "react";
import Nav from "./nav";
import styled from "styled-components";

const ContentContainer = styled.div`
  padding: 1rem;
  margin: 0 auto;
  max-width: 768px;
`;

export default function Layout({ children }) {
  return (
    <div>
      <Nav />
      <ContentContainer>{children}</ContentContainer>
    </div>
  );
}
