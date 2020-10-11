import Link from "../util/link";
import styled from "styled-components";
import Button from "../shared/button";

const links = [{ href: "/login", label: "Log In" }];

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
`;

const HomeLink = styled(Link)`
  font-weight: 600;
  font-size: 1.5rem;
  color: #fff;
`;

export default function Nav() {
  return (
    <NavContainer>
      <HomeLink href="/">NextJS JWT Auth</HomeLink>

      <LinksContainer>
        {links.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <Button>
              <Link href={href}>{label}</Link>
            </Button>
          </li>
        ))}
      </LinksContainer>
    </NavContainer>
  );
}
