import { Pressable, View, Text, StyleSheet } from 'react-native';
import Expense from '../../models/expense';
import { getFormattedDate } from '../../utils/date';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteStackParams } from '../../types/RouteStackParams';

function ExpenseItem({ id, amount, description, date }: Readonly<Expense>) {
	const navigation =
		useNavigation<NativeStackNavigationProp<RouteStackParams>>();

	function itemPressHandler() {
		navigation.navigate('ManageExpenses', {
			expenseId: id,
		});
	}

	return (
		<View style={styles.outerContainer}>
			<Pressable
				onPress={itemPressHandler}
				android_ripple={{ color: 'state', borderless: true }}
				style={({ pressed }) =>
					pressed ? [styles.pressed, styles.container] : styles.container
				}>
				<View>
					<Text style={styles.description}>{description}</Text>
					<Text>{getFormattedDate(new Date(date))}</Text>
				</View>
				<View style={styles.amountContainer}>
					<Text style={styles.amount}>Rp{amount.toLocaleString('id-ID')}</Text>
				</View>
			</Pressable>
		</View>
	);
}

export default ExpenseItem;

const styles = StyleSheet.create({
	outerContainer: {
		marginVertical: 8,
		borderRadius: 6,
		elevation: 3,
		shadowColor: 'gray',
		shadowRadius: 4,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.4,
	},
	container: {
		padding: 12,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	description: {
		fontSize: 16,
		marginBottom: 4,
		maxWidth: '80%',
		fontWeight: 'bold',
	},
	amountContainer: {
		paddingVertical: 4,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	amount: {
		fontWeight: 'bold',
	},
	pressed: {
		opacity: 0.75,
	},
});
