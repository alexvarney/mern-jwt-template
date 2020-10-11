import styled from "styled-components";

import Layout from "../components/layout/layout";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.slateBlue_dark};
  text-align: center;
`;

export default function Home() {
  return (
    <Layout>
      <Title>NextJS JWT Auth</Title>
    </Layout>
  );
}
