import { Alert, Platform, Pressable, StyleSheet, View } from 'react-native';
import Input from '../UI/Input';
import Button from '../UI/Button';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useContext, useLayoutEffect, useState } from 'react';
import { getFormattedDate } from '../../utils/date';
import Expense from '../../models/expense';
import { ExpensesContext } from '../../store/expenses';

interface Props {
	readonly expenseId?: string;
	readonly onCancel: () => void;
	readonly onSubmit: (expense: Expense) => void;
}

function ManageForm({ expenseId, onCancel, onSubmit }: Props) {
	const [expense, setExpense] = useState<Expense | null>();
	const [showDatePicker, setShowDatePicker] = useState(false);

	const expenseCtx = useContext(ExpensesContext);

	useLayoutEffect(() => {
		if (!expenseId) {
			setExpense({
				id: `e-${Math.floor(Math.random() * 100000000)
					.toString()
					.substring(0, 10)}`,
				amount: 0,
				date: new Date(),
			});
		} else {
			setExpense(
				expenseCtx.expenses.find((expense) => expense.id === expenseId),
			);
		}
	}, []);

	function inputChangeHandler(expenseProp: string, value: any) {
		if (expenseProp === 'amount') {
			value = value.replace(/[Rp|,.]/g, '');
			value = parseInt(value, 10);
		}
		setExpense(
			(prevData) => ({ ...prevData, [expenseProp]: value } as Expense),
		);
	}

	function onChangeDate(event: DateTimePickerEvent, selectedDate?: Date) {
		if (event.type == 'set') {
			if (Platform.OS === 'android') {
				setShowDatePicker(false);
			}

			setExpense(
				(prevData) => ({ ...prevData, date: selectedDate } as Expense),
			);
		} else {
			setShowDatePicker(false);
		}
	}

	function submitFormHandler() {
		const amountValidation =
			expense?.amount && !isNaN(expense.amount) && expense.amount > 0;

		if (!amountValidation) {
			return Alert.alert('Invalid', 'Amount must filled and greater than zero');
		}

		onSubmit(expense);
	}

	return (
		<View>
			<Input
				label="Amount"
				inputConfig={{
					keyboardType: 'decimal-pad',
					placeholder: 'Rp50.000',
					value: expense?.amount
						? `Rp${expense?.amount.toLocaleString('ID-id')}`
						: '',
					onChangeText: (value) => inputChangeHandler('amount', value),
				}}
			/>
			{!showDatePicker ? (
				<Pressable onPress={() => setShowDatePicker(true)}>
					<Input
						label="Date"
						inputConfig={{
							editable: false,
							value: getFormattedDate(
								expense?.date ? new Date(expense.date) : new Date(),
							),
						}}
					/>
				</Pressable>
			) : (
				<DateTimePicker
					mode="date"
					display="calendar"
					value={expense?.date ? new Date(expense.date) : new Date()}
					onChange={onChangeDate}
				/>
			)}

			<Input
				label="Description"
				inputConfig={{
					multiline: true,
					autoCorrect: false,
					autoCapitalize: 'sentences',
					value: expense?.description,
					onChangeText: (value) => inputChangeHandler('description', value),
				}}
			/>

			<View style={styles.buttonContainer}>
				<Button
					onPress={onCancel}
					variant="flat"
					style={styles.button}>
					Cancel
				</Button>
				<Button
					onPress={submitFormHandler}
					style={styles.button}>
					{expenseId ? 'Update' : 'Add'}
				</Button>
			</View>
		</View>
	);
}

export default ManageForm;

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 16,
	},
	button: {
		minWidth: 120,
		marginHorizontal: 0,
	},
});
