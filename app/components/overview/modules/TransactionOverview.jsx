import React, { useEffect, useState, Fragment } from 'react';
import Styled from 'styled-components';
import { rgba } from 'polished';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Colors } from '../../../styles';

const TransactionWrap = Styled.section`
  
`;

const Header = Styled.header`
  margin: 68px 0 0;
`;

const TransactionRow = Styled.div`
  border-bottom: 1px solid ${rgba(Colors.darkestBlue, 0.1)};
  padding: 16px 0;

  .category-label {
    margin: 4px 0 0;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 800;
    opacity: .3;
    letter-spacing: 1.2px;
  }

  .transaction-value {
    font-weight: 600;
    font-size: 20px;
  }
`;

const TransactionOverview = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [transactions, setTransActions] = useState([]);

  async function fetchTransactions() {
    setIsFetching(true);

    await new Promise((resolve, reject) => {
      fetch('/api/transactions', { method: 'get' })
        .then(res => res.json())
        .then(({ data }) => {
          console.log(data);
          resolve(data);
          setIsFetching(false);
          setTransActions(data);
        })
        .catch(error => reject(error));
    });
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Fragment>
      <Header>
        <h1>Transactions from {format(new Date(), 'MMMM')}</h1>
      </Header>
      <TransactionWrap>
        {!isFetching && transactions.length
          ? transactions.map(transaction => (
            <TransactionRow key={transaction.id}>
              <span className="transaction-value">&euro;{transaction.value}</span>
              <h3 className="category-label">{transaction.category_label}</h3>
            </TransactionRow>
          ))
          : <p>There haven&apos;t been logged any transactions yet for this month! Click <Link to="/add-transaction">here</Link> to get started.</p>
        }
      </TransactionWrap>

    </Fragment>
  );
};

export default TransactionOverview;
