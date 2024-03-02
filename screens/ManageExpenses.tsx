import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from '../components/UI/Icon';
import { ExpensesContext } from '../store/expenses';
import Expense from '../models/expense';
import ManageForm from '../components/expenses/ManageForm';
import {
	deleteExpense,
	storeExpense,
	updateExpense,
} from '../services/expenses';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import { AuthContext } from '../store/auth';

type Params = {
	expenseId?: string;
};

function ManageExpenses() {
	const route = useRoute<RouteProp<{ params: Params }>>();
	const navigation = useNavigation();
	const expenseCtx = useContext(ExpensesContext);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const authCtx = useContext(AuthContext);
	const expenseId = route.params?.expenseId;

	const token = authCtx.token;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: expenseId ? 'Edit Expense' : 'Add Expense',
		});
	}, [navigation, expenseId]);

	async function deleteExpenseHandler() {
		try {
			setIsLoading(true);
			await deleteExpense(expenseId as string, token as string).then(
				() => {
					const expenseData = expenseCtx.expenses.find(
						(expense) => expense.id === (expenseId as string),
					) as Expense;
					expenseCtx.deleteExpense(expenseData);
				},
			);
			navigation.goBack();
		} catch (error) {
			setError('Could not delete expense - please try again later!');
			setIsLoading(false);
		}
	}

	function cancelHandler() {
		navigation.goBack();
	}

	async function addOrUpdateExpenseHandler(expense: Expense) {
		try {
			setIsLoading(true);
			if (expenseId) {
				await updateExpense(expenseId, expense, token as string).then(
					() => expenseCtx.updateExpense(expense),
				);
			} else {
				await storeExpense(token as string, expense).then(
					async (id) => {
						await updateExpense(
							id,
							{ ...expense, id },
							token as string,
						);
						expenseCtx.addExpense({ ...expense, id });
					},
				);
			}
			navigation.goBack();
		} catch (error) {
			setError('Could not save data - please try again later!');
			setIsLoading(false);
			console.log(error);
		}
	}

	if (isLoading) return <LoadingOverlay />;

	if (!isLoading && error)
		return (
			<ErrorOverlay
				message={error}
				onClose={() => {
					setError('');
				}}
			/>
		);

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
						name='trash'
						size={24}
						color='#fa695f'
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
