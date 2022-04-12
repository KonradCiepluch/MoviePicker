import styled from 'styled-components';

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 400px;
  margin: 20px auto;
  padding: 5px 10px;

  box-shadow: 0 0 8px black;

  @media (max-width: 720px) {
    max-width: 360px;
    margin: 30px auto;
  }

  input {
    min-width: 220px;
    padding: 5px;
    border: 1px solid grey;
    border-radius: 10px;
  }
`;

export const FoundMoviesList = styled.ul`
  position: absolute;
  top: 140px;
  left: 50%;

  max-width: 400px;
  width: 400px;
  padding: 10px 15px;
  box-shadow: 0 0 3px black;

  list-style: none;

  transform: translateX(-50%);

  @media (max-width: 720px) {
    max-width: 360px;
    top: 210px;
  }

  li {
    display: flex;
    align-items: center;
    margin: 5px 0;
    padding: 5px;

    transition: background-color 0.1s ease-in-out;

    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }

    img {
      width: 50px;
      height: 100%;
    }

    a {
      display: block;
      margin: 0 0 0 10px;
      padding: 0;
    }
  }
`;

export default SearchBarWrapper;
