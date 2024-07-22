import axios from 'axios';
import Expense from '../models/expense';
import { API_LOCAL_V1 } from '@env';

export async function storeExpense(token: string, expense: Expense) {
	const response = await axios.post(`${API_LOCAL_V1}/expenses`, expense, {
		headers: { Authorization: `Bearer ${token}` },
	});

	return response.data.data;
}

export async function fetchExpenses(token: string) {
	const response = await axios.get(`${API_LOCAL_V1}/expenses`, {
		headers: { Authorization: `Bearer ${token}` },
	});

	if (response.status == 200) {
		const data = response.data.data.expenses;
		return Object.keys(data)?.map((key: string) => ({
			id: data[key].id,
			amount: data[key].amount,
			date: data[key].date,
			owner: data[key].owner,
			description: data[key].description,
		}));
	} else {
		return [];
	}
}

export async function updateExpense(
	id: string,
	expense: Expense,
	token: string,
) {
	return await axios.put(`${API_LOCAL_V1}/expenses/${id}`, expense, {
		headers: { Authorization: `Bearer ${token}` },
	});
}

export async function deleteExpense(id: string, token: string) {
	return await axios.delete(`${API_LOCAL_V1}/expenses/${id}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
}
