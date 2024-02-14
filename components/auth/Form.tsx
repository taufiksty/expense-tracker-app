import { StyleSheet, View } from 'react-native';
import AuthCredential from '../../models/authcredential';
import { useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';

interface Props {
	isLogin: boolean;
	onSubmit: ({ email, password, confirmPassword }: AuthCredential) => void;
}

function Form({ isLogin, onSubmit }: Props) {
	const [credential, setCredential] = useState<AuthCredential>({
		email: '',
		password: '',
	});

	function submitHandler() {
		onSubmit(credential);
	}

	return (
		<View>
			<View>
				<Input
					label='Email address'
					inputConfig={{
						keyboardType: 'email-address',
						value: credential.email,
						onChangeText: (value) =>
							setCredential({ ...credential, email: value }),
					}}
				/>
				<Input
					label='Password'
					inputConfig={{
						value: credential.password,
						onChangeText: (value) =>
							setCredential({ ...credential, password: value }),
						secureTextEntry: true,
					}}
				/>
				{!isLogin && (
					<Input
						label='Confirm password'
						inputConfig={{
							value: credential.confirmPassword,
							onChangeText: (value) =>
								setCredential({
									...credential,
									confirmPassword: value,
								}),
							secureTextEntry: true,
						}}
					/>
				)}
			</View>
			<View style={styles.btnContainer}>
				<Button onPress={submitHandler}>
					{isLogin ? 'Login' : 'Signup'}
				</Button>
			</View>
		</View>
	);
}

export default Form;

const styles = StyleSheet.create({
	btnContainer: { marginTop: 12 },
});
