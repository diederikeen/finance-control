import React from 'react';
import Styled from 'styled-components';
import { rgba } from 'polished';

const Intro = Styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 32px;
  border-radius: 3px;
  background-color: white;
  box-shadow: 0px 3px 6px ${rgba(0, 0, 0, 0.1)};

  h1 {
    margin: 0 0 6px;
  }
`;

const LoginIndex = () => (
  <Intro>
    <h1>Welcome to FinanceAssistant!</h1>
    <p>Please login or register with your Google Account.</p>

    <a href="/auth/google/">
      <img src={''}/>
      Log in with the googles
    </a>

    <a></a>
  </Intro>
);

export default LoginIndex;
