import PropTypes from 'prop-types';
import { client } from '../../config/db';

const createCategory = query => new Promise((resolve, reject) => {
  client.query(query)
    .then(data => resolve({
      message: 'Category has been added!',
      data: data.rows[0],
    }))
    .catch((error) => {
      reject(error);
    });
});

createCategory.propTypes = {
  query: PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
  }),
};

export default createCategory;
