import { ReactNode, createContext, useMemo, useReducer } from 'react';

import Expense from '../models/expense';

interface Props {
	readonly children: ReactNode;
}

interface ExpenseContextValue {
	expenses: Expense[];
	initExpenses: (expenses: Expense[]) => void;
	addExpense: (expense: Expense) => void;
	updateExpense: (expense: Expense) => void;
	deleteExpense: (expense: Expense) => void;
}

export const ExpensesContext = createContext<ExpenseContextValue>({
	expenses: [],
	initExpenses: (expenses: Expense[]) => {},
	addExpense: ({ description, amount, date }: Expense) => {},
	updateExpense: ({ id, description, amount, date }: Expense) => {},
	deleteExpense: ({ id }: Expense) => {},
});

interface ActionReducer {
	type: 'INIT' | 'ADD' | 'UPDATE' | 'DELETE';
	initPayload?: Expense[] | [];
	payload: Expense;
}

function expensesReducer(state: Expense[], action: ActionReducer) {
	let updatedState: Expense[];

	switch (action.type) {
		case 'INIT':
			updatedState = action.initPayload as Expense[];
			break;
		case 'ADD':
			updatedState = [...state, action.payload];
			break;
		case 'UPDATE':
			updatedState = state.map((expense) => {
				if (expense.id === action.payload.id) {
					return action.payload;
				}
				return expense;
			});
			break;
		case 'DELETE':
			updatedState = state.filter(
				(expense) => expense.id !== action.payload.id,
			);
			break;
		default:
			updatedState = state;
	}

	return updatedState;
}

function ExpensesContextProvider({ children }: Props) {
	const [expensesState, dispatch] = useReducer(expensesReducer, []);

	function initExpenses(expenses: Expense[]) {
		dispatch({
			type: 'INIT',
			payload: { id: '', amount: 0, owner: '', date: new Date() }, // just init
			initPayload: expenses,
		});
	}

	function addExpense(expenseData: Expense) {
		dispatch({ type: 'ADD', payload: expenseData });
	}

	function updateExpense(expenseData: Expense) {
		dispatch({ type: 'UPDATE', payload: expenseData });
	}

	function deleteExpense(expenseData: Expense) {
		dispatch({ type: 'DELETE', payload: expenseData });
	}

	const contextValue = useMemo(
		() => ({
			expenses: expensesState,
			initExpenses,
			addExpense,
			updateExpense,
			deleteExpense,
		}),
		[expensesState],
	);

	return (
		<ExpensesContext.Provider value={contextValue}>
			{children}
		</ExpensesContext.Provider>
	);
}

export default ExpensesContextProvider;
