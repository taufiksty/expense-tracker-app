import { Alert, StyleSheet, View, Text } from 'react-native';
import Form from './Form';
import Button from '../UI/Button';
import AuthCredential from '../../models/authcredential';
import { StackActions, useNavigation } from '@react-navigation/native';

interface Props {
	isLogin?: boolean;
	onAuth?: ({ email, password }: AuthCredential) => void;
}

function Auth({ isLogin = false, onAuth }: Props) {
	const navigation = useNavigation();

	function onSubmitHandler(credentials: AuthCredential) {
		let { email, password, confirmPassword } = credentials;

		const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
		const passwordIsValid = password.length >= 6;
		const confirmPasswordIsValid = password === confirmPassword;

		if (!emailIsValid || !passwordIsValid || !confirmPasswordIsValid) {
			Alert.alert('Invalid input', 'Please check your input');
			return;
		}

		onAuth && onAuth({ email, password });
	}

	function switchAuthModeHandler() {
		if (isLogin) {
			navigation.dispatch(StackActions.replace('Signup'));
		} else {
			navigation.dispatch(StackActions.replace('Login'));
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Expense Tracker App</Text>
			<Form
				isLogin={isLogin}
				onSubmit={onSubmitHandler}
			/>
			<View style={styles.btnContainer}>
				<Button
					variant='flat'
					onPress={switchAuthModeHandler}
					style={{ marginHorizontal: 90 }}>
					{isLogin ? 'Create new' : 'Log in instead'}
				</Button>
			</View>
		</View>
	);
}

export default Auth;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 128,
		marginHorizontal: 32,
		padding: 16,
	},
	text: {
		marginBottom: 16,
		fontSize: 20,
		paddingHorizontal: 4,
	},
	btnContainer: {
		marginTop: 8,
	},
});
