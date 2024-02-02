import {
	ReactNode,
	createContext,
	useLayoutEffect,
	useMemo,
	useReducer,
} from 'react';

import Expense from '../models/expense';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchExpenses, storeExpense } from '../utils/http';

interface Props {
	readonly children: ReactNode;
}

interface ExpenseContextValue {
	expenses: Expense[];
	addExpense: (expense: Expense) => void;
	updateExpense: (expense: Expense) => void;
	deleteExpense: (expense: Expense) => void;
}

export const ExpensesContext = createContext<ExpenseContextValue>({
	expenses: [],
	addExpense: ({ description, amount, date }: Expense) => {},
	updateExpense: ({ id, description, amount, date }: Expense) => {},
	deleteExpense: ({ id }: Expense) => {},
});

interface ActionReducer {
	type: 'INIT' | 'ADD' | 'UPDATE' | 'DELETE';
	initPayload?: Expense[] | [];
	payload: Expense;
}

const _retrieveData = async () => {
	try {
		/**
		 * Retrieve data using AsyncStorage on local
		 */
		// const jsonValue = await AsyncStorage.getItem('@expensetracker:expenses');
		// return jsonValue != null ? JSON.parse(jsonValue) : [];

		/**
		 * Retrieve data using Firebase on backend
		 */
		return await fetchExpenses();
	} catch (error) {
		console.log(error);
	}
};

const _saveData = async (data: object[]) => {
	try {
		const jsonValue = JSON.stringify(data);
		await AsyncStorage.removeItem('@expensetracker:expenses');
		await AsyncStorage.setItem('@expensetracker:expenses', jsonValue);
	} catch (error) {
		console.log(error);
	}
};

function expensesReducer(state: Expense[], action: ActionReducer) {
	let updatedState: Expense[];

	switch (action.type) {
		case 'INIT':
			updatedState = action.initPayload as Expense[];
			break;
		case 'ADD':
			updatedState = [...state, action.payload];
			storeExpense(action.payload);
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

	// _saveData(updatedState);
	return updatedState;
}

function ExpensesContextProvider({ children }: Props) {
	const [expensesState, dispatch] = useReducer(expensesReducer, []);

	useLayoutEffect(() => {
		const fetchDataFromStorage = async () => {
			await AsyncStorage.clear();
			try {
				const retrievedData = await _retrieveData();
				if (retrievedData && retrievedData.length > 0) {
					dispatch({
						type: 'INIT',
						payload: { id: '', amount: 0, date: new Date() }, // not used
						initPayload: retrievedData,
					});
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchDataFromStorage();
	}, []);

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
