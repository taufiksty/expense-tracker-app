import {
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	View,
} from 'react-native';

interface Props {
	readonly label: string;
	readonly inputConfig: TextInputProps;
}

function Input({ label, inputConfig }: Props) {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				{...inputConfig}
				style={
					inputConfig.multiline
						? [styles.input, styles.inputMultiline]
						: styles.input
				}
			/>
		</View>
	);
}

export default Input;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 4,
		marginVertical: 8,
	},
	label: {
		fontSize: 12,
		marginBottom: 4,
	},
	input: {
		padding: 6,
		borderRadius: 6,
		fontSize: 18,
		backgroundColor: 'white',
		color: 'black',
	},
	inputMultiline: {
		minHeight: 100,
		textAlignVertical: 'top',
	},
});
