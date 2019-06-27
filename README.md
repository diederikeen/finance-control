# Finance app

### Intro
A little finance app to get better insights on your expenses. You can create as many jars as you want as long as you don't exceed your maximum capacity.

### Technical specs
Its created with node.js, postgresql and React.

### Todo list

- [X] Make MVP product
	- [x] Be able to create a category
	- [x] Be able to add a transaction
	- [x] Display all the categories
- [ ] Clean up code after MVP
	- [ ] *Testing and proptyping*
	- [ ] Use formik for form handling
	- [ ] Replace `fetch` with `axios` to be consistent
	- [ ] Rename table content names to more appropriate names
	- [ ] Create better structure / code for Styled Components
	- [ ] Create better shareable modules / components
	- [ ] Set Guidelines for code
- [ ] New features
	- [ ] Write websockets to keep fetching changes in the background
	- [ ] Create a login
	- [ ] Create a profile page where you can adjust your income
	- [ ] Display current balance from this month
	- [ ] Filter options for month / year of transactions
	- [ ] Add a savings feature
	_Display a category as a saving option instead of as a spending jar_
	- [ ] Create recurring expenses like rent etc. 
	- [ ] Transfer money to next month
		_if you haven't spent all the money in month X take to month Y_
