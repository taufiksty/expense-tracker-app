import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';

interface Props {
	readonly message: string;
	readonly onClose: () => void;
}

function ErrorOverlay({ message, onClose }: Props) {
	return (
		<View style={styles.container}>
			<Text style={[styles.title, styles.text]}>An error occured!</Text>
			<Text style={styles.text}>{message}</Text>
			<Button onPress={onClose}>Ok, get it.</Button>
		</View>
	);
}

export default ErrorOverlay;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		textAlign: 'center',
		marginBottom: 8,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
});
