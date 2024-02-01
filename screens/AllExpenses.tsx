import { useContext } from 'react';
import ExpensesView from '../components/expenses';
import { ExpensesContext } from '../store/expenses';

function AllExpenses() {
	const expensesCtx = useContext(ExpensesContext);

	const expenseSortByDateDesc = expensesCtx.expenses.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	return (
		<ExpensesView
			period={0}
			expenses={expenseSortByDateDesc}
		/>
	);
}

export default AllExpenses;
