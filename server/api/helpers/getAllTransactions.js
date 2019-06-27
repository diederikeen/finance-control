import { client } from '../../config/db';

const getAllTransactions = (dates) => {
  const query = {
    name: 'select-all-transactions-from-uid',
    text: 'SELECT transactions.*, categories.label AS category_label from transactions INNER JOIN categories ON transactions.category_id = categories.id WHERE transactions.uid = $1 AND transactions.created_at BETWEEN $2::date AND $3::date',
    values: [1, dates.minDate, dates.maxDate],
  };

  return new Promise((resolve, reject) => {
    client.query(query)
      .then((data) => {
        resolve({
          message: 'Transactions succesfully retrieved!',
          data: data.rows,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getAllTransactions;
