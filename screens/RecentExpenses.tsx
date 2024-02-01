import { useContext } from 'react';
import ExpensesView from '../components/expenses';
import { ExpensesContext } from '../store/expenses';
import { getDateWeekBefore } from '../utils/date';

function RecentExpenses() {
	const expensesCtx = useContext(ExpensesContext);

	const expenseLast7Days = expensesCtx.expenses
		.filter(
			(expense) =>
				new Date(expense.date) > getDateWeekBefore() &&
				new Date(expense.date) <= new Date(),
		)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return (
		<ExpensesView
			period={7}
			expenses={expenseLast7Days}
		/>
	);
}

export default RecentExpenses;
