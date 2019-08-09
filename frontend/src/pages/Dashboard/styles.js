import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { darken } from 'polished';

export const Container = styled.div``;

export const NewLink = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 30px;

  form {
    display: flex;
    flex-direction: row;
    flex: 1;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      padding: 0 15px;
      margin-right: 10px;
      width: 100%;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    button {
      background: #3b9eff;
      border: 0;
      border-radius: 4px;
      height: 44px;
      color: #fff;
      padding: 0 10px;
      font-weight: bold;
      font-size: 16px;
      transition: background 0.2s;
      white-space: nowrap;
      margin-right: 25px;

      &:hover {
        background: ${darken(0.05, '#3b9eff')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;

export const Scroll = styled(PerfectScrollbar)``;

export const ButtonPrev = styled.button.attrs(props => ({
  disabled: props.page <= 1,
}))`
  opacity: ${props => (props.page <= 1 ? 0.3 : 1)};
`;

export const ButtonNext = styled.button.attrs(props => ({
  disabled: props.meetUps < 9,
}))`
  opacity: ${props => (props.meetUps < 9 ? 0.3 : 1)};
`;
