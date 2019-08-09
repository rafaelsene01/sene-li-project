import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus{
    outline:0;
  }

  html, body, #root {
    height: 100%;
    min-width: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
    color: #000;
  }

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: rgba(60,60,60,0.8) !important;

  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(60,60,60,0.8) !important;
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
    color: rgba(60,60,60,0.8) !important;
  }

  a {
    text-decoration: none;
    font-weight: bold;
    color: #999 !important;
    font-size: 16px;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
    background-color: #0066ff !important;
  }

  button#voltar {
    position: absolute;
    top: 0;
    right: 0;
    margin: 25px 55px;
    width: 71px;
    height: 42px;
    border-radius: 4px;
    border: none;

    a{
      color: #fff !important;
      width: 31px;
      height: 18px;
      font-weight: 700;
    }
  }
`;
