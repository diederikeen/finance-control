import React from 'react';
import Styled from 'styled-components';
import { rgba } from 'polished';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container } from '../../styles';
import Form from './Form.jsx';
import Categories from './Categories.jsx';
import NotificationBar from '../shared/Notification.jsx';

const Wrap = Styled.div`
  display: flex;
`;

const Aside = Styled.aside`
  flex: 320px 0 1;
  margin: 0 24px 0 0;
  background: white;
  box-shadow: 0px 3px 6px ${rgba(0, 0, 0, 0.1)};
  border-radius: 3px;


  nav a {
    display: block;
    border-bottom: 1px solid #e7e7e7;
    font-weight: 600;
    padding: 18px 24px;
    color: black;
    text-decoration :none;
  }
`;

const Content = Styled.section`
  flex-shrink: 1;
  width: 100%;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0px 3px 6px ${rgba(0, 0, 0, 0.1)};
`;

const ProfileIndex = ({ match }) => {
  const userData = window.INITIAL_STATE;
  return (
    <Container>
      {!userData.income
        && <NotificationBar state="message">
          <p>It seems you haven&apos;t filled in your budget yet. Please complete your profile.</p>
        </NotificationBar>
      }
      <Router>
        <Wrap>
          <Aside>
            <nav>
              <Link to={'/profile'}>Info</Link>
              <Link to={`${match.path}categories`}>Categories</Link>
            </nav>
          </Aside>

          <Content>
            <Route path="/profile" exact component={Form}/>
            <Route path={`${match.url}/:topicId`} exact component={Categories}/>
          </Content>
        </Wrap>
      </Router>
    </Container>
  );
};

export default ProfileIndex;
