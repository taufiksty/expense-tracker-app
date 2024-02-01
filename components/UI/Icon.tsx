import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';

interface Props {
	readonly name: keyof (typeof Feather)['glyphMap'];
	readonly color: string;
	readonly size: number;
	readonly style?: ViewStyle;
	readonly onPress?: () => void;
}

function Icon({ name, color, size, style = {}, onPress = () => {} }: Props) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => (pressed ? [style, styles.pressed] : style)}>
			<Feather
				name={name}
				color={color}
				size={size}
			/>
		</Pressable>
	);
}

export default Icon;

const styles = StyleSheet.create({
	pressed: {
		opacity: 0.75,
	},
});
