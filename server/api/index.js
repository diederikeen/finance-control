import bodyParser from 'body-parser';
import { Router as expressRouter } from 'express';
import { getMonth, getYear, format } from 'date-fns';
import Axios from 'axios';
import getTransactions from './helpers/getAllTransactions';
import getAllCategories from './helpers/getAllCategories';
import getCategory from './helpers/getCategory';
import createCategory from './helpers/createCategory';
import createTransaction from './helpers/createTransaction';

const jsonParser = bodyParser.json();
const router = expressRouter();

function formatDate(year, month) {
  let givenYear = year;
  let givenMonth = month;
  if (!month) givenMonth = getMonth(new Date());
  if (!year) givenYear = getYear(new Date());

  if (givenMonth.toString().length === 1) givenMonth = parseInt(`0${givenMonth}`, 10);

  const minDate = format(new Date(givenYear, givenMonth, 1), 'YYYY-MM-DD');
  const maxDate = format(new Date(givenYear, givenMonth + 1, 1), 'YYYY-MM-DD');

  return {
    minDate,
    maxDate,
  };
}

router.get('/transactions', jsonParser, async (req, res) => {
  const userId = req.session.passport.user;

  const { body: { month, year } } = req;
  const formattedDate = formatDate(year, month);
  const transactions = await getTransactions(formattedDate, userId);
  res.send(transactions);
});

router.get('/category', jsonParser, async (req, res) => {
  const { query: { id } } = req;

  const query = {
    name: 'select-all-transactions-from-category',
    text: 'SELECT * FROM transactions WHERE category_id = $1',
    values: [id],
  };

  const category = await getCategory(query);
  res.send(category);
});

router.get('/categories', jsonParser, async (req, res) => {
  const { body: { month, year } } = req;
  const id = req.session.passport.user;
  const formattedDate = formatDate(year, month);

  const query = {
    name: 'select-all-categories',
    text: 'SELECT * FROM categories WHERE uid = $1',
    values: [id],
  };

  const categories = await getAllCategories(query, formattedDate, id);
  res.send(categories);
});

router.post('/categories', jsonParser, async (req, res) => {
  const userId = req.session.passport.user;

  const query = {
    name: 'insert-category',
    text: 'INSERT INTO categories(label, max_spent, current_spent, uid) VALUES($1, $2, $3, $4)',
    values: [req.body.label, req.body.max_spent, req.body.current_spent || 0, userId],
  };

  const createdCategory = await createCategory(query);
  res.send(createdCategory);
});

router.post('/transaction', jsonParser, async (req, res) => {
  const userId = req.session.passport.user;

  const query = {
    name: 'insert-transaction',
    text: 'INSERT INTO transactions(value, label, description, category_id, recurring, created_at, uid) VALUES($1, $2, $3, $4, $5, $6::date, $7)',
    values: [
      req.body.value,
      req.body.label,
      req.body.description,
      parseInt(req.body.category_id, 10),
      req.body.recurring,
      req.body.created_at,
      userId,
    ],
  };

  const createdTransaction = createTransaction(query);
  res.send(createdTransaction);
});

module.exports = router;
