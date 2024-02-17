import { StyleSheet, Text, View } from 'react-native';
import ExpensesSummary from './Summary';
import ExpensesList from './List';
import Expense from '../../models/expense';
import Icon from '../UI/Icon';
import { useNavigation } from '@react-navigation/native';

interface Props {
	readonly expenses: Expense[];
	readonly period: number;
}

function ExpensesView({ expenses, period }: Props) {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<ExpensesSummary
				expenses={expenses}
				period={period}
			/>
			<View style={styles.containerList}>
				{expenses.length === 0 ? (
					<Text style={styles.noExpenseText}>
						No expense registered.
					</Text>
				) : (
					<ExpensesList expenses={expenses} />
				)}
			</View>

			{/* Floating Button */}
			<Icon
				name='plus'
				size={24}
				color='white'
				onPress={() => navigation.navigate('ManageExpenses' as never)}
				style={{
					position: 'absolute',
					bottom: 20,
					right: 20,
					borderRadius: 30,
					padding: 16,
					backgroundColor: 'blue',
					elevation: 6,
				}}
			/>
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
