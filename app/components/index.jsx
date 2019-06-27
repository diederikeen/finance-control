import React, { Fragment } from 'react';
import Styled from 'styled-components';

import HemletHelper from '../helpers/Helmet.jsx';
import Button from '../helpers/Button.jsx';

const Index = () => (
  <Fragment>
    <HemletHelper
      title = "My index page"
      description = "test"
    />
  </Fragment>
);

export default Index;
