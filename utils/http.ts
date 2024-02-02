import axios from 'axios';
import Expense from '../models/expense';
import { FIREBASE_URL } from '@env';

export function storeExpense(expense: Expense) {
	axios.post(`${FIREBASE_URL}expenses.json`, expense);
}

export async function fetchExpenses() {
	const response = await axios.get(`${FIREBASE_URL}expenses.json`);

	if (response.data) {
		return Object.keys(response.data)?.map((key: string) => ({
			id: response.data[key].id,
			amount: response.data[key].amount,
			date: response.data[key].date,
			description: response.data[key].description,
		}));
	} else {
		return [];
	}
}
