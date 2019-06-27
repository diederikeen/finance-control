import { client } from '../../config/db';

const getCategory = query => new Promise((resolve, reject) => {
  client.query(query)
    .then((data) => {
      resolve({
        message: 'Category succesfully retrieved!',
        data: data.rows,
      });
    })
    .catch((error) => {
      reject(error);
    });
});

export default getCategory;
