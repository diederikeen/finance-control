import { client } from '../../config/db';

/**
 * @param {Array} dates   Array of min and max date for transactions to be retrieved
 */
const getAllTransactions = (dates, id) => {
  const query = {
    name: 'select-all-transactions-from-uid',
    text: 'SELECT transactions.*, categories.label AS category_label from transactions INNER JOIN categories ON transactions.category_id = categories.id WHERE transactions.uid = $1 AND transactions.created_at BETWEEN $2::date AND $3::date',
    values: [id, dates.minDate, dates.maxDate],
  };

  return new Promise((resolve, reject) => {
    client.query(query)
      .then(({ rows: transactions }) => resolve({
        message: 'Transactions succesfully retrieved!',
        data: transactions.reverse(),
      }))
      .catch((error) => {
        reject(error);
      });
  });
};

export default getAllTransactions;
