import { useContext } from "react";
import Link from "../util/link";
import styled from "styled-components";
import Button from "../shared/button";
import Auth from "../util/auth";

const AuthStateEnum = Object.freeze({
  DEFAULT: 0,
  REQUIRE_LOGIN: 1,
  REQUIRE_LOGOUT: 2,
});

const links = [
  { href: "/", label: "Home", auth: AuthStateEnum.DEFAULT },
  { href: "/login", label: "Log In", auth: AuthStateEnum.REQUIRE_LOGOUT },
  { href: "/profile", label: "Profile", auth: AuthStateEnum.REQUIRE_LOGIN },
];

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.slateBlue_light};
  padding: 0 1.5rem;

  a {
    text-decoration: none;
  }
`;

const LinksContainer = styled.ul`
  display: flex;
  list-style-type: none;
  a,
  a:visited {
    color: #fff;
  }

  & > *:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const HomeLink = styled(Link)`
  font-weight: 600;
  font-size: 1.5rem;
  color: #fff;
`;

export default function Nav() {
  const [authState] = useContext(Auth);

  const { isLoggedIn } = authState;

  return (
    <NavContainer>
      <HomeLink href="/">NextJS JWT Auth</HomeLink>

      <LinksContainer>
        {links.map(({ href, label, auth }) => (
          <>
            {!(
              (isLoggedIn && auth === AuthStateEnum.REQUIRE_LOGOUT) ||
              (!isLoggedIn && auth === AuthStateEnum.REQUIRE_LOGIN)
            ) && (
              <li key={`${href}${label}`}>
                <Button>
                  <Link href={href}>{label}</Link>
                </Button>
              </li>
            )}
          </>
        ))}
      </LinksContainer>
    </NavContainer>
  );
}
