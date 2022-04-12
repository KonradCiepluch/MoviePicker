import styled from 'styled-components';

const MovieWrapper = styled.div`
  max-width: 400px;
  padding: 0 10px;
  margin: 30px auto;

  h2 {
    font-weight: 300;
    margin-bottom: 10px;
    text-align: center;
  }

  p {
    margin: 10px 0;
  }
`;

export const Hearth = styled.button<{ isFavourite: boolean }>`
  border: 0;

  font-size: 20px;
  color: ${({ isFavourite }) => (isFavourite ? 'red' : 'black')};
  background-color: transparent;

  cursor: pointer;
`;

export default MovieWrapper;
