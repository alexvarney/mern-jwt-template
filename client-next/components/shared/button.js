import styled from "styled-components";

export default styled.button`
  background-color: ${({ theme }) => theme.colors.slateBlue_medium};
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  color: hsl(0, 0%, 100%);
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  grid-column: 1 / -1;
  cursor: pointer;

  :focus,
  :hover {
    outline: none;
    background-color: ${({ theme }) => theme.colors.slateBlue_dark};
  }
`;
