import React, { Fragment, useState, useEffect } from 'react';
import Styled from 'styled-components';
import { rgba } from 'polished';
import CategoryBlock from './CategoryBlock.jsx';
import FormModal from '../../shared/FormModal.jsx';

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

const OverviewWrap = Styled.section`
  position: relative;
  left: -20px;
  width: calc(100% + 40px);
  display: flex;
  flex-wrap: wrap;
`;

const CategoryOverview = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  async function fetchCategories() {
    await new Promise((resolve, reject) => {
      fetch('http://localhost:9000/api/categories', { method: 'get' })
        .then(res => res.json())
        .then(({ data }) => {
          setIsFetching(false);
          resolve(data);
          setCategories(data);
          setTimeout(() => fetchCategories(), 1500);
        })
        .catch(error => reject(error));
    });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const FormData = {
    label: 'Add a jar',
    action: '/api/categories',
    inputs: [
      {
        type: 'text',
        placeholder: 'Jar name (e.g "Car insurance")',
        name: 'label',
      },
      {
        type: 'number',
        placeholder: 'Maximum you want to spent',
        name: 'max_spent',
      },
    ],
  };

  return (
    <Fragment>
      {isModalVisible && <FormModal data={FormData} visible={isModalVisible} />}
      <Header>
        <h1>Category overview for this month.</h1>
        <Button onClick={() => setIsModalVisible(!isModalVisible)}>Add category</Button>
      </Header>
      <OverviewWrap>
        {!isFetching
          && categories.map(category => (
          <CategoryBlock
            key={category.id}
            data={category}
          />
          ))
        }
      </OverviewWrap>
    </Fragment>
  );
};

export default CategoryOverview;
