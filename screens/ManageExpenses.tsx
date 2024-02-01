import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from '../components/UI/Icon';
import { ExpensesContext } from '../store/expenses';
import Expense from '../models/expense';
import ManageForm from '../components/expenses/ManageForm';

type Params = {
	expenseId?: string;
};

function ManageExpenses() {
	const route = useRoute<RouteProp<{ params: Params }>>();
	const navigation = useNavigation();
	const expenseCtx = useContext(ExpensesContext);

	const expenseId = route.params?.expenseId;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: expenseId ? 'Edit Expense' : 'Add Expense',
		});
	}, [navigation, expenseId]);

	function deleteExpenseHandler() {
		const expenseData = expenseCtx.expenses.find(
			(expense) => expense.id === (expenseId as string),
		) as Expense;
		expenseCtx.deleteExpense(expenseData);
		navigation.goBack();
	}

	function cancelHandler() {
		navigation.goBack();
	}

	function addOrUpdateExpenseHandler(expense: Expense) {
		if (expenseId) {
			expenseCtx.updateExpense(expense);
		} else {
			expenseCtx.addExpense(expense);
		}
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<ManageForm
				expenseId={expenseId}
				onCancel={cancelHandler}
				onSubmit={addOrUpdateExpenseHandler}
			/>
			{expenseId && (
				<View style={styles.iconDeleteContainer}>
					<Icon
						name="trash"
						size={24}
						color="#fa695f"
						onPress={deleteExpenseHandler}
					/>
				</View>
			)}
		</View>
	);
}

export default ManageExpenses;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
	},
	iconDeleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: 'blue',
		alignItems: 'center',
	},
	button: {
		minWidth: 120,
		marginHorizontal: 0,
	},
});
