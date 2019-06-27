import { client } from '../../config/db';

const createTransaction = query => new Promise((resolve, reject) => {
  client.query(query)
    .then((data) => {
      resolve({
        message: 'Transaction has been added!',
      });
    })
    .catch((error) => {
      reject(error);
    });
});

export default createTransaction;
