import axios from 'axios';
import AuthCredential from '../models/authcredential';
import { API_KEY } from '@env';

export async function signUp({ email, password }: AuthCredential) {
	await axios.post(
		`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
		{ email, password, returnSecureToken: true },
	);
}

export async function logIn({ email, password }: AuthCredential) {
	const response = await axios.post(
		`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
		{ email, password, returnSecureToken: true },
	);

	const { idToken: token, localId: userId } = response.data;

	return { token, userId };
}
