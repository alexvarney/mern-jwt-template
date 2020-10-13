import { useContext } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";
import withLogin from "../../components/util/withLogin";
import Auth from "../../components/util/auth";
import Button from "../../components/shared/button";
import styled from "styled-components";
import UserProfile from "../../components/pages/profile/userProfile";

const StyledButton = styled(Button)`
  display: block;
  border: none;
  background-color: ${({ theme }) => theme.colors.slateBlue_light};
`;

const HeadingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > * {
    margin: 0;
  }
  margin-bottom: 2rem;
`;

function ProfilePage({ error, user }) {
  const router = useRouter();
  const [authState, authActions] = useContext(Auth);

  const onLogout = (event) => {
    event.preventDefault();

    authActions.logout().then(() => {
      router.push("/login");
    });
  };

  return (
    <Layout>
      <HeadingRow>
        <h3>User Profile</h3>
        <StyledButton onClick={onLogout}>Log Out</StyledButton>
      </HeadingRow>
      <UserProfile user={user} />
    </Layout>
  );
}

export default withLogin(ProfilePage, (_, user) =>
  user._id ? null : "/login"
);
