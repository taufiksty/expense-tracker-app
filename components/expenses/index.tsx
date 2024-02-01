import { StyleSheet, Text, View } from 'react-native';
import ExpensesSummary from './Summary';
import ExpensesList from './List';
import Expense from '../../models/expense';

interface Props {
	readonly expenses: Expense[];
	readonly period: number;
}

function ExpensesView({ expenses, period }: Props) {
	return (
		<View style={styles.container}>
			<ExpensesSummary
				expenses={expenses}
				period={period}
			/>
			<View style={styles.containerList}>
				{expenses.length === 0 ? (
					<Text style={styles.noExpenseText}>No expense registered.</Text>
				) : (
					<ExpensesList expenses={expenses} />
				)}
			</View>
		</View>
	);
}

export default ExpensesView;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 20,
		paddingBottom: 0,
	},
	containerList: {
		flex: 1,
		justifyContent: 'center',
	},
	noExpenseText: {
		fontSize: 16,
		textAlign: 'center',
	},
});
