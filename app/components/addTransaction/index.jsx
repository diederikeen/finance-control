import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import styled from 'styled-components';

import { Container } from '../../styles';

const Form = styled.form`
  max-width: 620px;
  margin: 0 auto;
  
  label {
    margin: 0 0 6px;
  }

  input,select {
    width: 100%;
  }
`;

const AddTransactionIndex = () => {
  const [isFetchingCategories, setIsFetchingCategories] = useState(false);
  const [options, setOptions] = useState([]);

  async function populateSelect() {
    await new Promise((resolve, reject) => {
      axios.get('/api/categories')
        .then(({ data: { data: categories } }) => {
          setOptions(categories);
          setIsFetchingCategories(false);
        });
    });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const { target } = event;
    const fields = target.querySelectorAll('[name]');
    const data = {};

    fields.forEach((field) => {
      const { name, value } = field;
      data[name] = value;
    });

    axios.post('/api/transaction', data)
      .then(() => {
        console.log('yt');
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    populateSelect();
  }, []);


  return (
    <Container>
      <Form onSubmit={handleFormSubmit}>
        <div style={{ margin: '12px 0' }}>
          <label style={{ display: 'block' }} htmlFor="value">Amount</label>
          <input type="number" name="value" id="value" />
        </div>

        <div style={{ margin: '12px 0' }}>
          <label style={{ display: 'block' }} htmlFor="label">Label</label>
          <input type="text" name="label" id="label" />
        </div>

        <div style={{ margin: '12px 0' }}>
          <label style={{ display: 'block' }} htmlFor="created_at">Datum</label>
          <input type="date" name="created_at" id="created_at" defaultValue={format(new Date(), 'YYYY-MM-DD')}/>
        </div>

        {!isFetchingCategories
          ? <div style={{ margin: '12px 0' }}>
              <label style={{ display: 'block' }} htmlFor="category_id">Category</label>
              <select name="category_id" id="category_id">
                {options.map(option => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </div>
          : ''
        }

        <button type="submit">Submit</button>

      </Form>
    </Container>
  );
};

export default AddTransactionIndex;
