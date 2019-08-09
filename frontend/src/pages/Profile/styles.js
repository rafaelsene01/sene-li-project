import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 30px;

    input {
      width: 100%;
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }

    button {
      width: 162px;
      margin: 10px 0 0;
      border: 0;
      border-radius: 4px;
      height: 44px;
      color: #fff;
      font-weight: bold;
      font-size: 16px;

      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        margin-right: 10px;
      }
    }
  }
`;
