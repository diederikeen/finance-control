import React, { useEffect, useState, Fragment } from 'react';
import Styled from 'styled-components';
import { rgba } from 'polished';
import { format } from 'date-fns';
import FormModal from '../../shared/FormModal.jsx';

const TransactionWrap = Styled.section`
  box-shadow: 0 16px 40px ${rgba(0, 0, 0, 0.16)};
  background-color: white;
  border-radius: 12px;
  margin: 0 0 48px;
`;

const Header = Styled.header`
  padding: 48px 0 12px;
  margin: 0 0 24px;
  font-weight: 100;
  display: flex;
  justify-content: space-between;

  h1 {
    margin: 0;
  }
`;

const Button = Styled.button`
  font-size: 18px;
  font-family: 'Rubik';
  height: 46px;
  border: none;
  background-color: #005eff;
  color: white;
  border-radius: 50px;
  box-shadow: 0 1px 4px ${rgba(0, 0, 0, 0.2)};
  display: inline-block;
  padding: 0 40px;
`;

const TransactionRow = Styled.div`
  padding: 18px 18px;

  &:not(:last-of-type) {
    border-bottom: 1px solid #e8e8e8;
  }

  h4 {
    font-size: 12px;
    margin: 0 0 8px;
    text-transform: uppercase;
    color: ${rgba(0, 0, 0, 0.3)};
  }
  
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    span {
      display: inline-block;
      font-size: 22px;
      font-family: 'Rubik';
      font-weight: 400;
      transform: translateY(-10%);
    }
  }
`;

const formData = {
  label: 'Add transaction',
  action: '/api/transaction',
  inputs: [
    {
      type: 'select',
      name: 'category_id',
      options: [],
    },
    {
      type: 'number',
      name: 'value',
      placeholder: 'E.g 25',
    },
    {
      type: 'text',
      name: 'label',
      placeholder: 'e.g Groceries for BBQ',
    },
    {
      type: 'date',
      name: 'created_at',
      placeholder: 'e.g 25',
      defaultValue: format(new Date(), 'YYYY-MM-DD'),
    },
  ],
};

const TransactionOverview = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [transactions, setTransActions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fieldData, setFieldData] = useState(formData);

  function populateCategorySelect() {
    return new Promise((resolve, reject) => {
      fetch('/api/categories', { method: 'get' })
        .then(res => res.json())
        .then(({ data }) => {
          data.forEach((category) => {
            fieldData.inputs[0].options.push({
              id: category.id,
              label: category.label,
            });
          });
          resolve();
        })
        .catch(error => reject(error));
    });
  }

  async function handleClick() {
    await populateCategorySelect();
    setIsModalVisible(!isModalVisible);
  }

  async function fetchTransactions() {
    setIsFetching(true);

    await new Promise((resolve, reject) => {
      fetch('/api/transactions', { method: 'get' })
        .then(res => res.json())
        .then(({ data }) => {
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
      {isModalVisible
        && <FormModal data={fieldData} visible={isModalVisible} />
      }
      <Header>
        <h1>Transactions list</h1>

        <Button onClick={() => handleClick()}>Add transaction</Button>
      </Header>
      <TransactionWrap>
        {!isFetching
          && transactions.map(transaction => (
            <TransactionRow key={transaction.id}>
              <h4>{transaction.category_label}</h4>
              <div>
                <h3>{transaction.label}</h3>
                <span>&euro;{transaction.value}</span>
              </div>
            </TransactionRow>
          ))
        }
      </TransactionWrap>

    </Fragment>
  );
};

export default TransactionOverview;
