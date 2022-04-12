import styled from 'styled-components';

const PageWrapper = styled.div`
  max-width: 800px;
  margin: 30px auto;
  padding: 0 10px;

  p {
    margin: 10px 0;
    font-weight: 400;

    &:nth-child(1) {
      font-weight: 500;
    }
  }

  button {
    position: absolute;
    top: 95px;
    right: 20%;

    padding: 6px 10px;
    border: none;
    border-radius: 10px;

    font-weight: 500;
    color: white;
    background-color: #000;

    cursor: pointer;
    transition: opacity 0.2s ease-in-out;

    &:hover {
      opacity: 0.5;
    }

    @media (max-width: 720px) {
      top: 155px;
    }
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

export default PageWrapper;
