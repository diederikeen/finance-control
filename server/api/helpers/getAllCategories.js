import { client } from '../../config/db';

/**
 * @param {object} category   Category object to be populated
 * @param {array}  array      Contains a list of transactions within the given category
 */

function calculateSaldo(category, array) {
  Object.assign(category, { current_spent: array.reduce((prev, next) => prev + next.value, 0) });
}

/**
 * @param {queryObject} query   Query to be executed.
 * @param {array}       dates   Array of dates which determines the period of transactions
 */

const getAllCategories = (query, dates) => new Promise((resolve, reject) => {
  const childQuery = {
    text: 'SELECT * FROM transactions WHERE created_at BETWEEN $1::date AND $2::date',
    values: [dates.minDate, dates.maxDate],
  };

  client.query(query)
    .then(({ rows: categories }) => (
      client.query(childQuery)
        .then(({ rows: transactions }) => {
          categories
            .map(category => calculateSaldo(
              category,
              transactions.filter(transaction => transaction.category_id === category.id),
            ));
        })
        .then(() => resolve({
          message: 'Categories succesfully retrieved',
          data: categories,
        }))
    ))
    .catch((error) => {
      reject(error);
    });
});

export default getAllCategories;
