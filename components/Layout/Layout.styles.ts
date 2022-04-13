import styled from 'styled-components';

const Navigation = styled.nav`
  text-align: center;

  h1 {
    margin: 10px 0;
    font-size: 26px;
    font-weight: 300;

    @media (max-width: 720px) {
      margin-top: 70px;
    }
  }

  ul {
    display: flex;
    justify-content: center;

    list-style: none;
  }

  button {
    position: absolute;
    top: 10px;
    right: 10px;

    padding: 5px 10px;
    border-radius: 15px;
    border: 1px solid black;

    font-weight: 500;
    background-color: transparent;
    color: black;

    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: black;
      color: white;
    }
  }
`;

export default Navigation;
