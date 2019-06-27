import React, { Fragment } from 'react';
import { Container } from '../../styles/index';
import CategoryOverview from './modules/CategoryOverview.jsx';
import TransactionOverview from './modules/TransactionOverview.jsx';

const OverviewIndex = () => (
  <Fragment>
    <Container>
      <CategoryOverview />
      <TransactionOverview />
    </Container>
  </Fragment>
);

export default OverviewIndex;
