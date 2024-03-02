import axios from 'axios';
import Expense from '../models/expense';
import { FIREBASE_URL } from '@env';

export async function storeExpense(token: string, expense: Expense) {
	const response = await axios.post(
		`${FIREBASE_URL}expenses.json?auth=${token}`,
		expense,
	);
	return response.data.name;
}

export async function fetchExpenses(token: string, userId: string) {
	const response = await axios.get(
		`${FIREBASE_URL}expenses.json?auth=${token}`,
	);

	if (response.data) {
		return Object.keys(response.data)
			?.map((key: string) => ({
				id: response.data[key].id,
				amount: response.data[key].amount,
				date: response.data[key].date,
				owner: response.data[key].owner,
				description: response.data[key].description,
			}))
			.filter((data) => data.owner === userId);
	} else {
		return [];
	}
}

export async function updateExpense(
	id: string,
	expense: Expense,
	token: string,
) {
	return await axios.put(
		`${FIREBASE_URL}expenses/${id}.json?auth=${token}`,
		expense,
	);
}

export async function deleteExpense(id: string, token: string) {
	return await axios.delete(
		`${FIREBASE_URL}expenses/${id}.json?auth=${token}`,
	);
}
