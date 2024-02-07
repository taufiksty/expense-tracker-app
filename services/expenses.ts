import axios from 'axios';
import Expense from '../models/expense';
import { FIREBASE_URL } from '@env';

export async function storeExpense(expense: Expense) {
	const response = await axios.post(`${FIREBASE_URL}expenses.json`, expense);
	return response.data.name;
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

export async function updateExpense(id: string, expense: Expense) {
	return await axios.put(`${FIREBASE_URL}expenses/${id}.json`, expense);
}

export async function deleteExpense(id: string) {
	return await axios.delete(`${FIREBASE_URL}expenses/${id}.json`);
}
