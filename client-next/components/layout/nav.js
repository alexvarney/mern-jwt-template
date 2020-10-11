import Link from "../util/link";
import styled from "styled-components";

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

  li {
    margin-left: 1rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
    background-color: ${({ theme }) => theme.colors.slateBlue_dark};
  }
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
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </LinksContainer>
    </NavContainer>
  );
}
