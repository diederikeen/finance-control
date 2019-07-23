import { client } from '../../config/db';

/**
 * @param {QueryObject} query   Query to be executed
 */
const createTransaction = query => new Promise((resolve, reject) => {
  client.query(query)
    .then(() => resolve({
      message: 'Transaction has been added!',
    }))
    .catch((error) => {
      reject(error);
    });
});

export default createTransaction;
