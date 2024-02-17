import { useState } from 'react';
import Auth from '../components/auth';
import AuthCredential from '../models/authcredential';
import { signUp } from '../services/auth';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Signup() {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigation = useNavigation();

	async function signUpHandler(credentials: AuthCredential) {
		setIsLoading(true);
		try {
			await signUp(credentials);
			navigation.navigate('Login' as never);
		} catch (error) {
			Alert.alert(
				'Signup failed',
				'Please check your input or try again later!',
			);
			setIsLoading(false);
		}
	}

	if (isLoading) {
		return <LoadingOverlay message='Creating a new user...' />;
	}
	return <Auth onAuth={signUpHandler} />;
}

export default Signup;
