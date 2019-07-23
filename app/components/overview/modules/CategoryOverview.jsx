import React, { Fragment, useState, useEffect } from 'react';
import Styled from 'styled-components';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { format } from 'date-fns';
import CategoryBlock from './CategoryBlock.jsx';

const Header = Styled.header`

`;

const OverviewWrap = Styled.section`
  
`;

const CategoryOverview = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    await new Promise((resolve, reject) => {
      Axios.get('http://localhost:9000/api/categories')
        .then(({ data: { data: fetchedCategories } }) => {
          setIsFetching(false);
          resolve(fetchedCategories);
          setCategories(fetchedCategories);
        })
        .catch(error => reject(error));
    });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Fragment>
      <Header>
        <h1>Category overview for {format(new Date(), 'MMMM')}.</h1>
      </Header>
      <OverviewWrap>
        {!isFetching
          ? categories.map(category => (
            <CategoryBlock
              key={category.id}
              data={category}
            />
          )) : <p>It seems you haven&apos;t created any categories yet! Click <Link to="/add-category">here</Link> to get started.</p>
        }
      </OverviewWrap>
    </Fragment>
  );
};

export default CategoryOverview;
