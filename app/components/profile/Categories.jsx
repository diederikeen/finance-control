import React, { useEffect, useState } from 'react';
import Styled from 'styled-components';
import { rgba } from 'polished';
import Axios from 'axios';

const Row = Styled.div`
  padding: 12px 18px;
  border-bottom: 1px solid ${rgba(0, 0, 0, 0.1)};

  .label {
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 800;
    opacity: .3;
    letter-spacing: 1.2px;
    margin: 0;
  }
  .category-label {
    margin: 0;
    font-size: 24px;
  }
`;

function Category({ category }) {
  return (
    <Row>
      <div>
        <p className="label">
          Category name
        </p>

        <h3 className="category-label">
          {category.label}
        </h3>
      </div>

      <p className="budget">
        Max budget: {category.max_spent}
      </p>
    </Row>
  );
}

const ProfileCategories = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [userCategories, setUserCategories] = useState([]);

  async function fetchCategories() {
    return new Promise((resolve, reject) => {
      Axios.get('http://localhost:9000/api/categories')
        .then(({ data }) => {
          setIsFetching(false);
          resolve(data.data);
          setUserCategories(data.data);
        })
        .catch(err => reject(err));
    });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      {!isFetching
        && userCategories.length
        ? userCategories.map(category => <Category key={category.id} category={category} />)
        : <p>It seems like you haven&apos;t added any categories yet, click <a href="">Click here</a> to create one</p>
      }
    </div>
  );
};

export default ProfileCategories;
