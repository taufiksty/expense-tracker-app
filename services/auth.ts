import axios from 'axios';
import AuthCredential from '../models/authcredential';
import { API_LOCAL_V1 } from '@env';

export async function signUp({ name, email, password }: AuthCredential) {
	await axios.post(`${API_LOCAL_V1}/register`, {
		name,
		email,
		password,
	});
}

export async function logIn({ email, password }: AuthCredential) {
	const response = await axios.post(`${API_LOCAL_V1}/login`, {
		email,
		password,
	});

	const { token, user } = response.data.data;

	return { token, user };
}

export async function logOut({ token }: { token: string }) {
	await axios.delete(`${API_LOCAL_V1}/logout`, {
		headers: { Authorization: `Bearer ${token}` },
	});
}
