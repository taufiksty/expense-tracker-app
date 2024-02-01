import { FlatList } from 'react-native';
import Expense from '../../models/expense';
import ExpenseItem from './Item';

interface Props {
	readonly expenses: Expense[];
}

interface ItemData {
	item: Expense;
}

function renderItem({ item }: ItemData) {
	return <ExpenseItem {...item} />;
}

function ExpensesList({ expenses }: Props) {
	return (
		<FlatList
			data={expenses}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
		/>
	);
}

export default ExpensesList;
