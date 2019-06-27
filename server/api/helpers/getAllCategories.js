import { client } from '../../config/db';

const getAllCategories = (query, dates) => new Promise((resolve, reject) => {
  const childQuery = {
    text: 'SELECT * FROM transactions WHERE created_at BETWEEN $1::date AND $2::date',
    values: [dates.minDate, dates.maxDate],
  };

  client.query(query)
    .then((data) => {
      client.query(childQuery)
        .then(({ rows }) => {
          data.rows.map((category) => {
            let totalSpent = 0;

            rows.find((transaction) => {
              if (transaction.category_id === category.id) {
                totalSpent += transaction.value;
              }
            });
            Object.assign(category, { current_spent: totalSpent });
          });
        })
        .then(() => {
          resolve({
            message: 'Retrieved categories',
            data: data.rows,
          });
        });
    })
    .catch((error) => {
      reject(error);
    });
});

export default getAllCategories;
