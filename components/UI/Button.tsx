import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface Props {
	readonly children: string;
	readonly onPress: () => void;
	readonly style?: ViewStyle;
	readonly variant?: string;
}

function Button({ children, onPress, style, variant = 'primary' }: Props) {
	return (
		<View style={style}>
			<Pressable
				onPress={onPress}
				style={({ pressed }) => pressed && styles.pressed}>
				<View style={[styles.button, variant === 'flat' && styles.flat]}>
					<Text
						style={
							variant === 'flat'
								? [styles.buttonText, styles.flatText]
								: styles.buttonText
						}>
						{children}
					</Text>
				</View>
			</Pressable>
		</View>
	);
}

export default Button;

const styles = StyleSheet.create({
	button: {
		borderRadius: 4,
		padding: 8,
		backgroundColor: 'blue',
	},
	flat: {
		backgroundColor: 'transparent',
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
	},
	flatText: {
		color: 'black',
	},
	pressed: {
		opacity: 0.75,
		borderRadius: 4,
	},
});
