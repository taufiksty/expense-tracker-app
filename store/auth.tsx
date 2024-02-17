import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReactNode, createContext, useState } from 'react';

interface Props {
	children: ReactNode;
}

interface AuthContextValue {
	token?: string;
	userId?: string;
	isAuthenticated: boolean;
	addToken: ({ token, userId }: { token: string; userId: string }) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
	token: '',
	userId: '',
	isAuthenticated: false,
	addToken: () => {},
	logout: () => {},
});

function AuthContextProvider({ children }: Props) {
	const [token, setToken] = useState<string>();
	const [userId, setUserId] = useState<string>();

	function addToken({ token, userId }: { token: string; userId: string }) {
		setToken(token);
		setUserId(userId);
		AsyncStorage.setItem(
			'@expense-tracker-app:userData',
			JSON.stringify({ token, userId }),
		);
	}

	function logout() {
		setToken(undefined);
		setUserId(undefined);
		AsyncStorage.removeItem('@expense-tracker-app:userData');
	}

	return (
		<AuthContext.Provider
			value={{
				token,
				userId,
				isAuthenticated: !!token,
				addToken,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContextProvider;
