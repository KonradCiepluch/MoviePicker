import styled from 'styled-components';

const LinkWrapper = styled.a<{ active: boolean }>`
  margin: 0 20px;
  padding: 0 0 5px;

  border-bottom: ${({ active }) => (active ? '1px solid black' : '')};
  text-decoration: none;
  color: #000;

  cursor: pointer;
`;

export default LinkWrapper;
