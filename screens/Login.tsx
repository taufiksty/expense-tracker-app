import { useContext, useState } from 'react';
import Auth from '../components/auth';
import AuthCredential from '../models/authcredential';
import { logIn } from '../services/auth';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth';

function Login() {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const authCtx = useContext(AuthContext);

	async function loginHandler(credentials: AuthCredential) {
		setIsLoading(true);
		try {
			const res = await logIn(credentials);
			authCtx.addToken(res);
		} catch (error) {
			Alert.alert(
				'Login failed',
				'Please check your input or try again later!',
			);
			setIsLoading(false);
		}
	}

	if (isLoading) return <LoadingOverlay message='Logging in...' />;

	return (
		<Auth
			isLogin
			onAuth={loginHandler}
		/>
	);
}

export default Login;
