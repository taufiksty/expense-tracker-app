import { StyleSheet, Text, View } from 'react-native';
import Expense from '../../models/expense';

interface Props {
	readonly expenses: Expense[];
	readonly period: number;
}

function ExpensesSummary({ expenses, period }: Props) {
	const sumExpenses = expenses.reduce(
		(sum, expense) => sum + expense.amount,
		0,
	);

	return (
		<View style={styles.container}>
			<Text style={styles.period}>
				{period ? `Last ${period} days` : 'All Time'}
			</Text>
			<Text style={styles.summary}>
				Rp{sumExpenses.toLocaleString('id-ID')}
			</Text>
		</View>
	);
}

export default ExpensesSummary;

const styles = StyleSheet.create({
	container: {
		padding: 8,
		marginBottom: 8,
		backgroundColor: 'white',
		borderRadius: 6,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	period: {
		fontSize: 12,
	},
	summary: {
		fontSize: 16,
		fontWeight: 'bold',
	},
});
