import React from 'react';
import Styled from 'styled-components';
import { rgba } from 'polished';
import { Colors } from '../../styles';

const Bar = Styled.section`
  border-radius: 3px;
  padding: 12px 24px;
  border: 2px solid;
  margin: 24px 0 48px;
  background-color: white;
  box-shadow: 0px 3px 6px ${rgba(0, 0, 0, 0.1)};
  ${props => props.state === 'message' && `border-color: ${Colors.lightBlue}`}
`;

const NotificationBar = ({children, state}) => (
  <Bar state={state}>
    {children}
  </Bar>
);

export default NotificationBar;
