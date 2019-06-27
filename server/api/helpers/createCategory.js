import { client } from '../../config/db';

const createCategory = query => new Promise((resolve, reject) => {
  client.query(query)
    .then((data) => {
      resolve({
        message: 'Category has been added!',
        data: data.rows[0],
      });
    })
    .catch((error) => {
      reject(error);
    });
});

export default createCategory;
