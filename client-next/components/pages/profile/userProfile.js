import { useContext, useEffect, useState } from "react";
import Config from "../../../config";
import { useCookies } from "react-cookie";
import Auth from "../../util/auth";
import Button from "../../shared/button";
import styled from "styled-components";

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    margin: 0.75rem;
  }
  border-radius: 0.5rem 0.5rem 0.25rem 0.25rem;
  margin: 0 auto;
  width: min-content;
  padding: 1rem 3rem 2rem;
  box-shadow: 0px 14px 44px -6px hsl(0, 0%, 75%);
  text-align: center;
`;

const CircleContainer = styled.p`
  font-size: 3rem;
  line-height: 2rem;
  display: grid;
  align-items: center;
  justify-items: center;
  color: #fff;

  &,
  & * {
    grid-column: 1;
    grid-row: 1;
  }

  ::after {
    z-index: -1;
    content: " ";
    display: block;
    grid-column: 1;
    grid-row: 1;

    width: 1rem;
    height: 1rem;
    padding: 2.5rem;
    border-radius: 50%;
    background-color: hsla(202, 57%, 37%, 1);
    box-shadow: 1px 0px 24px -5px rgba(0, 0, 0, 0.5);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  & > * {
    margin: 0 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  display: block;
  border: none;
  background-color: ${({ theme }) => theme.colors.slateBlue_light};
`;

const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    margin: 0 0 0.5rem 0;
  }
  text-align: left;
`;

const Editable = ({ isEditing, displayComponent, editComponent }) => {
  return isEditing ? editComponent : displayComponent;
};

const UserProfile = (props) => {
  const [authState, authActions] = useContext(Auth);
  const [isEditing, setIsEditing] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies("jwt");

  const cancelEditing = () => {
    setUserState(authState.user);
    setPassword1("");
    setPassword2("");
    setIsEditing(false);
  };

  const [userState, setUserState] = useState({});
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  useEffect(() => setUserState(authState.user), [authState.user]);

  const setUserProperty = (name, value) => {
    setUserState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSave = () => {
    const password =
      password1.length >= 6 && password1 === password2 ? password1 : null;

    fetch(`${Config.API_ENDPOINT}${Config.PROFILE}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: cookies.jwt,
      },
      body: JSON.stringify({
        ...userState,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setPassword1("");
        setPassword2("");
        authActions.setUser(res);
        setIsEditing(false);
      });
  };

  return (
    <UserContainer>
      <CircleContainer>
        <span>{userState?.name?.slice(0, 1)}</span>
      </CircleContainer>
      <Editable
        displayComponent={<h1>{userState?.name}</h1>}
        editComponent={
          <input
            value={userState?.name}
            onChange={(e) => setUserProperty("name", e.target.value)}
          />
        }
        isEditing={isEditing}
      />
      <p>
        <code>{userState?._id}</code>
      </p>
      <p>[{userState?.role}]</p>
      <Editable
        displayComponent={<p>{userState?.email}</p>}
        editComponent={
          <input
            value={userState?.email}
            onChange={(e) => setUserProperty("email", e.target.value)}
          />
        }
        isEditing={isEditing}
      />
      {isEditing && (
        <PasswordContainer>
          <p>Change Password:</p>
          <input
            type="password"
            value={password1}
            onChange={(e) => {
              setPassword1(e.target.value);
              setPassword2("");
            }}
          />
          {password1.length > 0 && (
            <>
              <p>Confirm:</p>
              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </>
          )}
        </PasswordContainer>
      )}
      <ButtonRow>
        {isEditing ? (
          <>
            <StyledButton onClick={cancelEditing}>Cancel</StyledButton>
            <Button onClick={onSave}>Save</Button>
          </>
        ) : (
          <StyledButton
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </StyledButton>
        )}
      </ButtonRow>
    </UserContainer>
  );
};

export default UserProfile;
