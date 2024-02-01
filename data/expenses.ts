import Expense from '../models/expense';

const DUMMY_EXPENSES: Expense[] = [
	{
		id: 'e1',
		description: 'Fuel',
		amount: 20000,
		date: new Date('2024-01-18'),
	},
	{
		id: 'e2',
		description: 'Lays Black Pepper',
		amount: 10000,
		date: new Date('2024-01-18'),
	},
	{
		id: 'e3',
		description: 'Parking',
		amount: 3000,
		date: new Date('2024-01-18'),
	},
	{
		id: 'e4',
		description: 'Trouser',
		amount: 295000,
		date: new Date('2024-01-12'),
	},
	{
		id: 'e5',
		description: 'T-Shirt',
		amount: 198000,
		date: new Date('2024-01-12'),
	},
];

export default DUMMY_EXPENSES;
