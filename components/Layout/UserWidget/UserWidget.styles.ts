import styled from 'styled-components';

const WidgetWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;

  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid black;

  @media (max-width: 800px) {
    padding: 4px 6px;
  }

  h3 {
    font-size: 14px;
    font-weight: 300;

    @media (max-width: 800px) {
      font-size: 12px;
    }
  }

  a {
    text-decoration: none;
    color: #000;
    font-size: 14px;

    @media (max-width: 800px) {
      font-size: 12px;
    }
  }
`;

export default WidgetWrapper;
