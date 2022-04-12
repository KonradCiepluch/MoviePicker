import styled from 'styled-components';

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px 15px;

  max-width: 1000px;
  padding: 0 10px;
  margin: 30px auto;

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Movie = styled.article`
  text-align: center;

  cursor: pointer;

  img {
    transition: transform 0.3s ease-in-out;
  }

  &:hover img {
    transform: scale(1.1);
  }

  p {
    margin: 10px 0;
  }
`;

export default Wrapper;
